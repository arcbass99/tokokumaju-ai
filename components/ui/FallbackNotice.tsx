type FallbackNoticeProps = {
  title?: string;
  description?: string;
};

export function FallbackNotice({
  title = "Mode demo cadangan aktif",
  description = "AI sedang ramai atau kuota sementara terbatas. Untuk menjaga alur demo tetap bisa dicoba, TokokuMaju AI memakai hasil cadangan khusus untuk Kue Rina Homemade.",
}: FallbackNoticeProps) {
  return (
    <div className="rounded-3xl border border-amber-200 bg-amber-50 p-5 text-amber-950">
      <p className="font-semibold">{title}</p>
      <p className="mt-2 text-sm leading-7 text-amber-900">{description}</p>
    </div>
  );
}