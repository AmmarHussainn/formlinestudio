import { useState, useCallback, useEffect, useRef } from "react";
import { RetellWebClient } from "retell-client-js-sdk";

// Initialize client as a singleton to keep latency warming (pings) active for fast connections
const retellWebClient = new RetellWebClient();

export const useRetellCall = () => {
  const [isCalling, setIsCalling] = useState(false);
  const [callStatus, setCallStatus] = useState<
    "idle" | "connecting" | "active" | "ended" | "error"
  >("idle");
  const [error, setError] = useState<string | null>(null);

  // Use ref to store current calling state for use in global event listeners
  const isCallingRef = useRef(false);

  useEffect(() => {
    const handleCallStarted = () => {
      console.log("Call started");
      setCallStatus("active");
      setIsCalling(true);
      isCallingRef.current = true;
    };

    const handleCallEnded = () => {
      console.log("Call ended");
      setCallStatus("ended");
      setIsCalling(false);
      isCallingRef.current = false;
    };

    const handleError = (err: any) => {
      console.error("Retell error:", err);
      setCallStatus("error");
      setError(err.message || "An error occurred during the call");
      setIsCalling(false);
      isCallingRef.current = false;
    };

    retellWebClient.on("call_started", handleCallStarted);
    retellWebClient.on("call_ended", handleCallEnded);
    retellWebClient.on("error", handleError);

    // KILL SWITCH: Stop call if user closes tab or reloads
    const handleBeforeUnload = () => {
      if (isCallingRef.current) {
        retellWebClient.stopCall();
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      retellWebClient.off("call_started", handleCallStarted);
      retellWebClient.off("call_ended", handleCallEnded);
      retellWebClient.off("error", handleError);
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  const startCall = useCallback(async (agentId: string) => {
    setCallStatus("connecting");
    setError(null);
    try {
      const response = await fetch("/api/create-web-call", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ agent_id: agentId }),
      });

      if (!response.ok) {
        throw new Error("Failed to create web call session");
      }

      const data = await response.json();

      await retellWebClient.startCall({
        accessToken: data.access_token,
      });
    } catch (err: any) {
      console.error("Error starting call:", err);
      setCallStatus("error");
      setError(err.message || "Failed to start call");
      setIsCalling(false);
      isCallingRef.current = false;
    }
  }, []);

  const stopCall = useCallback(() => {
    retellWebClient.stopCall();
  }, []);

  return {
    isCalling,
    callStatus,
    error,
    startCall,
    stopCall,
  };
};
