export const JobCard = () => {
  return (
    <div className="cursor-pointer min-w-72 rounded-xl shadow border p-5 lg:p-6 hover:shadow-none transition">
      <div className="h-14 w-14 bg-muted rounded-full" />
      <h5 className="font-bold mt-4">Crisis Intervention specialist</h5>
      <p className="text-muted-foreground text-sm font-medium flex items-center gap-1 mt-1">
        London <span className="h-1 w-1 bg-muted-foreground rounded-full" /> Dribble Inc
      </p>
      <div className="rounded-full border py-2.5 px-4 text-sm font-bold mt-6 w-fit hover:bg-muted transition">
        $50k - 55k per month
      </div>
    </div>
  );
};
