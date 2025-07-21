//Detect device type (mobile, tablet, desktop)

import { useEffect } from "react";

const detectDevice = () => {
    useEffect(() => {
        const userAgent = navigator.userAgent;
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
        const isTablet = /Tablet|iPad/i.test(userAgent);
        const isDesktop = !isMobile && !isTablet;
    }, []);
}