const useReferral = () => {
  const checkReferralCodeExists = async (code: string | null = null) => {
    if (!code) return false;

    try {
      const response = await fetch(`/Web/Referral/checkReferralCode/${code}`);

      const data = await response.json();
      console.log("Referral check:", data);

      return data.status === 200;
    } catch (err) {
      console.error("Network error:", err);
      return false;
    }
  };

  return { checkReferralCodeExists };
};

export default useReferral;
