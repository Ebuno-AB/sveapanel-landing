const SWEDISH_DAYS = ["MAN", "TIS", "ONS", "TORS", "FRE", "LÖR", "SÖN"];

const StreakSkeleton = () => (
  <div className="streak-page">
    <div className="streak-tab-switcher-wrap">
      <div className="streak-tab-switcher">
        <div className="skel skel-tab" />
        <div className="skel skel-tab" />
      </div>
    </div>

    <div className="streak-content">
      <div className="streak-hero">
        <div className="streak-hero-inner">
          <div className="skel skel-fire" />
          <div className="skel skel-num" />
        </div>
        <div className="skel skel-text" />
        <div className="skel skel-text-sm" />
      </div>

      <div className="streak-skeleton-card">
        <div className="skel skel-title" />
        <div className="skel skel-bar-full" />
        <div className="weekly-days">
          {SWEDISH_DAYS.map((d) => (
            <div key={d} className="day-item">
              <div className="skel skel-circle" />
              <div className="skel skel-day-label" />
            </div>
          ))}
        </div>
      </div>

      <div className="streak-skeleton-card">
        <div className="skel skel-title" />
        <div className="skel skel-text" style={{ marginTop: 8 }} />
      </div>
    </div>
  </div>
);

export default StreakSkeleton;
