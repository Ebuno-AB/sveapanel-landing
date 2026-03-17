function CompSkeleton() {
  return (
    <div className="comp-skeleton">
      {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
        <div key={i} className="comp-skeleton-bar" />
      ))}
    </div>
  );
}

export default CompSkeleton;
