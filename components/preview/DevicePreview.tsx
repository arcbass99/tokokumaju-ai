import type { BusinessBrief, GeneratedSite } from "@/lib/schemas";
import { LandingPageRenderer } from "@/components/preview/LandingPageRenderer";

export type PreviewDevice = "mobile" | "tablet" | "desktop";

type DevicePreviewProps = {
  device: PreviewDevice;
  brief: BusinessBrief;
  site: GeneratedSite;
};

const deviceWidth: Record<PreviewDevice, string> = {
  mobile: "max-w-[390px]",
  tablet: "max-w-[760px]",
  desktop: "max-w-full",
};

export function DevicePreview({ device, brief, site }: DevicePreviewProps) {
  return (
    <div className="rounded-[2rem] border border-neutral-200 bg-neutral-100 p-4 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <p className="text-sm font-semibold text-neutral-700">
          Preview: {device}
        </p>

        <div className="flex gap-1">
          <span className="h-3 w-3 rounded-full bg-red-400" />
          <span className="h-3 w-3 rounded-full bg-yellow-400" />
          <span className="h-3 w-3 rounded-full bg-green-400" />
        </div>
      </div>

      <div
        className={`mx-auto overflow-hidden rounded-[1.5rem] border border-neutral-200 bg-white shadow-xl ${deviceWidth[device]}`}
      >
        <div className="max-h-[760px] overflow-y-auto">
          <LandingPageRenderer brief={brief} site={site} />
        </div>
      </div>
    </div>
  );
}