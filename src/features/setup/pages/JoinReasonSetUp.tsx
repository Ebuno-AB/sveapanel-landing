import { useState } from "react";
import {
  useGetReasons,
  useSubmitJoinReason,
  useCompleteSetup,
} from "../api/setup.mutations";
import { SetupProgress } from "../components/SetupProgress";
import "../styles/SetUp.css";

export const JoinReasonSetUp = () => {
  const [selectedReasonId, setSelectedReasonId] = useState<number | null>(null);
  const { data: reasons, isLoading: isLoadingReasons } = useGetReasons();
  const {
    mutate: submitReason,
    isPending: isSubmitting,
    error: submitError,
  } = useSubmitJoinReason();
  const {
    mutate: completeSetup,
    isPending: isCompleting,
    error: completeError,
  } = useCompleteSetup();

  const isPending = isSubmitting || isCompleting;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedReasonId === null) return;

    submitReason(selectedReasonId, {
      onSuccess: () => completeSetup(),
    });
  };

  return (
    <div className="setup-page">
      <div className="setup-card">
        <SetupProgress />
        <h1 className="setup-title">Hur hittade du oss?</h1>
        <p className="setup-description">
          Välj det alternativ som stämmer bäst in på dig.
        </p>
        <form onSubmit={handleSubmit}>
          {isLoadingReasons ? (
            <p className="setup-loading">Laddar alternativ...</p>
          ) : (
            <div className="setup-reasons">
              {reasons?.map((reason) => (
                <label
                  key={reason.reasonId}
                  className={`setup-reason-option${
                    selectedReasonId === reason.reasonId ? " selected" : ""
                  }`}
                >
                  <input
                    type="radio"
                    name="reason"
                    value={reason.reasonId}
                    checked={selectedReasonId === reason.reasonId}
                    onChange={() => setSelectedReasonId(reason.reasonId)}
                  />
                  {reason.title}
                </label>
              ))}
            </div>
          )}
          {(submitError || completeError) && (
            <p className="setup-error">
              {(submitError ?? completeError)!.message}
            </p>
          )}
          <button
            className="setup-btn"
            type="submit"
            disabled={isPending || selectedReasonId === null}
          >
            {isPending ? "Slutför..." : "Slutför registrering"}
          </button>
        </form>
      </div>
    </div>
  );
};
