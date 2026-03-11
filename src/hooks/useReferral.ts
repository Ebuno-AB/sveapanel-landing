import { useDispatch } from "react-redux";
import { setReferralCode } from "../redux/slices/sessionSlice";
import { API_ENDPOINTS } from "../config/api";

const useReferral = () => {
  const dispatch = useDispatch();

  const checkReferralCodeExists = async (code: string | null = null) => {
    if (!code || code.length !== 5) return false;

    try {
      const response = await fetch(API_ENDPOINTS.REFERRAL.CHECK_CODE(code));

      const data = await response.json();
      console.log("Referral check:", data);

      if (data.status === 200) {
        console.log("Dispatching referral code");
        dispatch(setReferralCode(code));
      }

      return data.status === 200;
    } catch (err) {
      console.error("Network error:", err);
      return false;
    }
  };

  return { checkReferralCodeExists };
};

export default useReferral;
