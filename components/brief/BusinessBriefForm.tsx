"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  businessCategories,
  colorPaletteOptions,
  copyToneOptions,
  paymentMethodOptions,
  targetGoalOptions,
  visualVibeOptions,
} from "@/data/categories";
import type {
  BusinessBrief,
  ColorPalette,
  CopyTone,
  TargetGoal,
  VisualVibe,
} from "@/lib/schemas";
import {
  normalizeIndonesianWhatsApp,
  validateBusinessBrief,
} from "@/lib/validators";
import { Button } from "@/components/ui/Button";
import {
  FieldWrapper,
  Select,
  Textarea,
  TextInput,
} from "@/components/ui/Field";
import { BriefProgress } from "@/components/brief/BriefProgress";
import { BriefSummary } from "@/components/brief/BriefSummary";

const steps = [
  "Identitas",
  "Produk",
  "Kontak",
  "Tujuan",
  "Gaya",
  "Ringkasan",
];

const BRIEF_STORAGE_KEY = "tokokumaju.businessBrief";
const STRATEGY_STORAGE_KEY = "tokokumaju.aiStrategy";
const GENERATED_SITE_STORAGE_KEY = "tokokumaju.generatedSite";

const initialBrief: BusinessBrief = {
  businessName: "",
  category: "",
  customCategory: "",
  slogan: "",

  featuredProducts: "",
  priceRange: "",
  productStrengths: "",
  reasonToChoose: "",

  whatsapp: "",
  mapsUrl: "",
  operatingHours: "",
  paymentMethods: [],

  socialLinks: [{ platform: "", value: "" }],

  targetGoal: "whatsapp",
  visualVibe: "warm_friendly",
  customVibe: "",
  colorPalette: "warm_terracotta",
  copyTone: "casual_persuasive",

  extraNotes: "",
};

export function BusinessBriefForm() {
  const router = useRouter();

  const [brief, setBrief] = useState<BusinessBrief>(initialBrief);
  const [currentStep, setCurrentStep] = useState(0);
  const [hasTriedSubmit, setHasTriedSubmit] = useState(false);
  const [hasLoadedSavedBrief, setHasLoadedSavedBrief] = useState(false);

  useEffect(() => {
    try {
      const savedBrief = window.localStorage.getItem(BRIEF_STORAGE_KEY);

      if (savedBrief) {
        const parsedBrief = JSON.parse(savedBrief) as Partial<BusinessBrief>;

        setBrief({
          ...initialBrief,
          ...parsedBrief,
          paymentMethods: Array.isArray(parsedBrief.paymentMethods)
            ? parsedBrief.paymentMethods
            : [],
          socialLinks:
            Array.isArray(parsedBrief.socialLinks) &&
            parsedBrief.socialLinks.length > 0
              ? parsedBrief.socialLinks
              : [{ platform: "", value: "" }],
        });
      }
    } catch {
      window.localStorage.removeItem(BRIEF_STORAGE_KEY);
    } finally {
      setHasLoadedSavedBrief(true);
    }
  }, []);

  useEffect(() => {
    if (!hasLoadedSavedBrief) return;

    window.localStorage.setItem(BRIEF_STORAGE_KEY, JSON.stringify(brief));
    window.localStorage.removeItem(STRATEGY_STORAGE_KEY);
    window.localStorage.removeItem(GENERATED_SITE_STORAGE_KEY);
  }, [brief, hasLoadedSavedBrief]);

  const errors = useMemo(() => validateBusinessBrief(brief), [brief]);

  const hasBlockingErrors = Object.keys(errors).length > 0;

  function updateBrief<T extends keyof BusinessBrief>(
    key: T,
    value: BusinessBrief[T]
  ) {
    setBrief((current) => ({
      ...current,
      [key]: value,
    }));
  }

  function togglePaymentMethod(method: string) {
    setBrief((current) => {
      const exists = current.paymentMethods.includes(method);

      return {
        ...current,
        paymentMethods: exists
          ? current.paymentMethods.filter((item) => item !== method)
          : [...current.paymentMethods, method],
      };
    });
  }

  function updateSocialLink(
    index: number,
    key: "platform" | "value",
    value: string
  ) {
    setBrief((current) => {
      const next = [...current.socialLinks];
      next[index] = { ...next[index], [key]: value };
      return { ...current, socialLinks: next };
    });
  }

  function addSocialLink() {
    setBrief((current) => ({
      ...current,
      socialLinks: [...current.socialLinks, { platform: "", value: "" }],
    }));
  }

  function removeSocialLink(index: number) {
    setBrief((current) => ({
      ...current,
      socialLinks:
        current.socialLinks.length <= 1
          ? [{ platform: "", value: "" }]
          : current.socialLinks.filter((_, itemIndex) => itemIndex !== index),
    }));
  }

  function goNext() {
    if (currentStep < steps.length - 1) {
      setCurrentStep((step) => step + 1);
    }
  }

  function goBack() {
    if (currentStep === 0) {
      router.push("/");
      return;
    }

    setCurrentStep((step) => step - 1);
  }

  function clearBrief() {
    const confirmed = window.confirm(
      "Kosongkan semua isi brief? Data yang sudah kamu isi akan dihapus dari browser ini."
    );

    if (!confirmed) return;

    window.localStorage.removeItem(BRIEF_STORAGE_KEY);
    setBrief(initialBrief);
    setCurrentStep(0);
    setHasTriedSubmit(false);
  }

  function handlePrepareStrategy() {
    setHasTriedSubmit(true);

    if (hasBlockingErrors) {
      return;
    }

    const normalizedBrief: BusinessBrief = {
      ...brief,
      businessName: brief.businessName.trim(),
      category: brief.category.trim(),
      customCategory: brief.customCategory?.trim(),
      slogan: brief.slogan?.trim(),
      featuredProducts: brief.featuredProducts.trim(),
      priceRange: brief.priceRange?.trim(),
      productStrengths: brief.productStrengths?.trim(),
      reasonToChoose: brief.reasonToChoose?.trim(),
      whatsapp: normalizeIndonesianWhatsApp(brief.whatsapp),
      mapsUrl: brief.mapsUrl?.trim(),
      operatingHours: brief.operatingHours?.trim(),
      extraNotes: brief.extraNotes?.trim(),
      socialLinks: brief.socialLinks
        .map((item) => ({
          platform: item.platform.trim(),
          value: item.value.trim(),
        }))
        .filter((item) => item.platform || item.value),
    };

    window.localStorage.setItem(BRIEF_STORAGE_KEY, JSON.stringify(normalizedBrief));

    router.push("/strategy");
  }

  return (
    <div className="space-y-6">
      <BriefProgress steps={steps} currentStep={currentStep} />

      <div className="rounded-[2rem] border border-neutral-200 bg-white p-6 shadow-sm md:p-8">
        {currentStep === 0 ? (
          <StepIdentity
            brief={brief}
            errors={hasTriedSubmit ? errors : {}}
            updateBrief={updateBrief}
          />
        ) : null}

        {currentStep === 1 ? (
          <StepProducts
            brief={brief}
            errors={hasTriedSubmit ? errors : {}}
            updateBrief={updateBrief}
          />
        ) : null}

        {currentStep === 2 ? (
          <StepContact
            brief={brief}
            errors={hasTriedSubmit ? errors : {}}
            updateBrief={updateBrief}
            togglePaymentMethod={togglePaymentMethod}
            updateSocialLink={updateSocialLink}
            addSocialLink={addSocialLink}
            removeSocialLink={removeSocialLink}
          />
        ) : null}

        {currentStep === 3 ? (
          <StepGoal
            brief={brief}
            errors={hasTriedSubmit ? errors : {}}
            updateBrief={updateBrief}
          />
        ) : null}

        {currentStep === 4 ? (
          <StepStyle
            brief={brief}
            errors={hasTriedSubmit ? errors : {}}
            updateBrief={updateBrief}
          />
        ) : null}

        {currentStep === 5 ? <BriefSummary brief={brief} /> : null}

        <div className="mt-8 flex flex-col gap-3 border-t border-neutral-200 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button type="button" variant="secondary" onClick={goBack}>
              {currentStep === 0 ? "Kembali ke Beranda" : "Kembali"}
            </Button>

            <Button type="button" variant="ghost" onClick={clearBrief}>
              Kosongkan Brief
            </Button>
          </div>

          {currentStep < steps.length - 1 ? (
            <Button type="button" onClick={goNext}>
              Lanjut
            </Button>
          ) : (
            <Button type="button" onClick={handlePrepareStrategy}>
              Lanjut ke AI Strategist
            </Button>
          )}
        </div>

        {hasTriedSubmit && hasBlockingErrors ? (
          <div className="mt-4 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm leading-6 text-red-800">
            Ada data wajib yang belum lengkap. Periksa nama usaha, kategori,
            produk/jasa unggulan, WhatsApp, link Maps, atau vibe custom.
          </div>
        ) : null}
      </div>
    </div>
  );
}

type StepProps = {
  brief: BusinessBrief;
  errors?: Partial<Record<keyof BusinessBrief, string>>;
  updateBrief: <T extends keyof BusinessBrief>(
    key: T,
    value: BusinessBrief[T]
  ) => void;
};

function StepHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="mb-8">
      <p className="text-sm font-semibold uppercase tracking-[0.22em] text-emerald-700">
        {eyebrow}
      </p>
      <h2 className="mt-3 text-3xl font-semibold tracking-tight">{title}</h2>
      <p className="mt-3 max-w-2xl leading-7 text-neutral-600">
        {description}
      </p>
    </div>
  );
}

function StepIdentity({ brief, errors = {}, updateBrief }: StepProps) {
  return (
    <div>
      <StepHeader
        eyebrow="Langkah 1"
        title="Identitas usaha"
        description="Mulai dari informasi paling dasar agar AI memahami siapa yang sedang dibantu."
      />

      <div className="grid gap-5">
        <FieldWrapper label="Nama usaha" error={errors.businessName}>
          <TextInput
            value={brief.businessName}
            onChange={(event) => updateBrief("businessName", event.target.value)}
            placeholder="Contoh: Kopi Sore Bu Rina"
          />
        </FieldWrapper>

        <FieldWrapper label="Kategori usaha" error={errors.category}>
          <Select
            value={brief.category}
            onChange={(event) => updateBrief("category", event.target.value)}
          >
            <option value="">Pilih kategori</option>
            {businessCategories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </Select>
        </FieldWrapper>

        {brief.category === "Lainnya" ? (
          <FieldWrapper label="Kategori custom" error={errors.customCategory}>
            <TextInput
              value={brief.customCategory ?? ""}
              onChange={(event) =>
                updateBrief("customCategory", event.target.value)
              }
              placeholder="Contoh: Rental perlengkapan bayi"
            />
          </FieldWrapper>
        ) : null}

        <FieldWrapper
          label="Slogan atau tagline"
          description="Opsional. Kalau belum ada, AI bisa membantu menyarankan nanti."
        >
          <TextInput
            value={brief.slogan ?? ""}
            onChange={(event) => updateBrief("slogan", event.target.value)}
            placeholder="Contoh: Kopi rumahan untuk sore yang pelan"
          />
        </FieldWrapper>
      </div>
    </div>
  );
}

function StepProducts({ brief, errors = {}, updateBrief }: StepProps) {
  return (
    <div>
      <StepHeader
        eyebrow="Langkah 2"
        title="Produk dan penawaran"
        description="Bagian ini menentukan apakah landing page nanti terasa spesifik atau terlalu generik."
      />

      <div className="grid gap-5">
        <FieldWrapper
          label="Produk atau jasa unggulan"
          error={errors.featuredProducts}
        >
          <Textarea
            value={brief.featuredProducts}
            onChange={(event) =>
              updateBrief("featuredProducts", event.target.value)
            }
            placeholder="Contoh: Kopi susu gula aren, pisang goreng, paket nongkrong sore, dan kopi literan pre-order."
          />
        </FieldWrapper>

        <FieldWrapper
          label="Kisaran harga"
          description="Opsional, tapi sangat membantu untuk konversi."
        >
          <Textarea
            value={brief.priceRange ?? ""}
            onChange={(event) => updateBrief("priceRange", event.target.value)}
            placeholder="Contoh: Minuman mulai Rp12.000, camilan mulai Rp8.000, paket hemat mulai Rp25.000."
          />
        </FieldWrapper>

        <FieldWrapper label="Kelebihan produk atau bahan baku">
          <Textarea
            value={brief.productStrengths ?? ""}
            onChange={(event) =>
              updateBrief("productStrengths", event.target.value)
            }
            placeholder="Contoh: Pakai biji kopi lokal, gula aren asli, dibuat fresh saat dipesan."
          />
        </FieldWrapper>

        <FieldWrapper label="Mengapa pelanggan harus memilih usaha ini?">
          <Textarea
            value={brief.reasonToChoose ?? ""}
            onChange={(event) =>
              updateBrief("reasonToChoose", event.target.value)
            }
            placeholder="Contoh: Tempatnya santai, harga ramah, cocok untuk mahasiswa dan warga sekitar."
          />
        </FieldWrapper>
      </div>
    </div>
  );
}

type StepContactProps = StepProps & {
  togglePaymentMethod: (method: string) => void;
  updateSocialLink: (
    index: number,
    key: "platform" | "value",
    value: string
  ) => void;
  addSocialLink: () => void;
  removeSocialLink: (index: number) => void;
};

function StepContact({
  brief,
  errors = {},
  updateBrief,
  togglePaymentMethod,
  updateSocialLink,
  addSocialLink,
  removeSocialLink,
}: StepContactProps) {
  return (
    <div>
      <StepHeader
        eyebrow="Langkah 3"
        title="Kontak dan operasional"
        description="Pastikan pelanggan tahu cara membeli, bertanya, atau datang ke lokasi."
      />

      <div className="grid gap-5">
        <FieldWrapper label="Nomor WhatsApp" error={errors.whatsapp}>
          <TextInput
            value={brief.whatsapp}
            onChange={(event) => updateBrief("whatsapp", event.target.value)}
            placeholder="Contoh: 081234567890"
          />
        </FieldWrapper>

        <FieldWrapper label="Link Google Maps" error={errors.mapsUrl}>
          <TextInput
            value={brief.mapsUrl ?? ""}
            onChange={(event) => updateBrief("mapsUrl", event.target.value)}
            placeholder="https://maps.app.goo.gl/..."
          />
        </FieldWrapper>

        <FieldWrapper label="Jam operasional">
          <Textarea
            value={brief.operatingHours ?? ""}
            onChange={(event) =>
              updateBrief("operatingHours", event.target.value)
            }
            placeholder="Contoh: Senin-Sabtu, 10.00-21.00. Minggu libur."
          />
        </FieldWrapper>

        <div>
          <p className="text-sm font-semibold text-neutral-900">
            Metode pembayaran
          </p>

          <div className="mt-3 flex flex-wrap gap-2">
            {paymentMethodOptions.map((method) => {
              const active = brief.paymentMethods.includes(method);

              return (
                <button
                  key={method}
                  type="button"
                  onClick={() => togglePaymentMethod(method)}
                  className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                    active
                      ? "border-neutral-950 bg-neutral-950 text-white"
                      : "border-neutral-300 bg-white text-neutral-700 hover:bg-neutral-100"
                  }`}
                >
                  {method}
                </button>
              );
            })}
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between gap-4">
            <p className="text-sm font-semibold text-neutral-900">
              Media sosial
            </p>

            <Button type="button" variant="ghost" onClick={addSocialLink}>
              + Tambah
            </Button>
          </div>

          <div className="mt-3 space-y-3">
            {brief.socialLinks.map((item, index) => (
              <div
                key={index}
                className="grid gap-3 md:grid-cols-[1fr_1fr_auto]"
              >
                <TextInput
                  value={item.platform}
                  onChange={(event) =>
                    updateSocialLink(index, "platform", event.target.value)
                  }
                  placeholder="Instagram"
                />

                <TextInput
                  value={item.value}
                  onChange={(event) =>
                    updateSocialLink(index, "value", event.target.value)
                  }
                  placeholder="@tokokumaju atau link"
                />

                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => removeSocialLink(index)}
                >
                  Hapus
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function StepGoal({ brief, updateBrief }: StepProps) {
  return (
    <div>
      <StepHeader
        eyebrow="Langkah 4"
        title="Tujuan utama website"
        description="Satu website bisa punya banyak informasi, tapi harus punya satu arah tindakan utama."
      />

      <div className="grid gap-3 md:grid-cols-2">
        {targetGoalOptions.map((option) => {
          const active = brief.targetGoal === option.value;

          return (
            <button
              key={option.value}
              type="button"
              onClick={() =>
                updateBrief("targetGoal", option.value as TargetGoal)
              }
              className={`rounded-3xl border p-5 text-left transition ${
                active
                  ? "border-neutral-950 bg-neutral-950 text-white"
                  : "border-neutral-200 bg-white text-neutral-950 hover:bg-neutral-50"
              }`}
            >
              <p className="font-semibold">{option.label}</p>
              <p
                className={`mt-2 text-sm leading-6 ${
                  active ? "text-neutral-300" : "text-neutral-500"
                }`}
              >
                Jadikan ini tindakan utama yang ingin dilakukan calon pelanggan.
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function StepStyle({ brief, errors = {}, updateBrief }: StepProps) {
  return (
    <div>
      <StepHeader
        eyebrow="Langkah 5"
        title="Gaya brand"
        description="Pilih nuansa visual dan cara bicara yang paling cocok untuk usahamu."
      />

      <div className="grid gap-5">
        <FieldWrapper label="Vibe visual">
          <Select
            value={brief.visualVibe}
            onChange={(event) =>
              updateBrief("visualVibe", event.target.value as VisualVibe)
            }
          >
            {visualVibeOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
        </FieldWrapper>

        {brief.visualVibe === "custom" ? (
          <FieldWrapper
            label="Deskripsikan vibe custom"
            error={errors.customVibe}
          >
            <TextInput
              value={brief.customVibe ?? ""}
              onChange={(event) => updateBrief("customVibe", event.target.value)}
              placeholder="Contoh: Tropis, playful, warna cerah, cocok untuk anak muda."
            />
          </FieldWrapper>
        ) : null}

        <FieldWrapper label="Palet warna">
          <Select
            value={brief.colorPalette}
            onChange={(event) =>
              updateBrief("colorPalette", event.target.value as ColorPalette)
            }
          >
            {colorPaletteOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
        </FieldWrapper>

        <FieldWrapper label="Tone copywriting">
          <Select
            value={brief.copyTone}
            onChange={(event) =>
              updateBrief("copyTone", event.target.value as CopyTone)
            }
          >
            {copyToneOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
        </FieldWrapper>

        <FieldWrapper label="Catatan tambahan">
          <Textarea
            value={brief.extraNotes ?? ""}
            onChange={(event) => updateBrief("extraNotes", event.target.value)}
            placeholder="Contoh: Jangan terlalu formal. Tonjolkan suasana rumahan dan harga ramah."
          />
        </FieldWrapper>
      </div>
    </div>
  );
}