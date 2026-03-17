function FeedSkeleton() {
  return (
    <>
      <div className="cb-feed-section">
        <div className="cb-skeleton-row">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="cb-skeleton-card cb-skeleton-category" />
          ))}
        </div>
      </div>
      <div className="cb-feed-section" style={{ marginTop: 28 }}>
        <div className="cb-skeleton-row">
          {[1, 2, 3].map((i) => (
            <div key={i} className="cb-skeleton-card cb-skeleton-featured" />
          ))}
        </div>
      </div>
      <div className="cb-feed-section" style={{ marginTop: 28 }}>
        <div className="cb-skeleton-row">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="cb-skeleton-card" />
          ))}
        </div>
      </div>
    </>
  );
}

export default FeedSkeleton;
