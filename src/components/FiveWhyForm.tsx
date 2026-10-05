"use client";

import { FormEvent, useState } from "react";
import { DEPARTMENTS, PROBLEMS } from "@/data/fiveWhy";

type TestType = "pretest" | "posttest";

interface FiveWhyFormProps {
  testType: TestType;
}

interface FormData {
  nama: string;
  nik: string;
  department: string;
  tanggal: string;
  problem: string;
  otherProblem: string;
  why1: string;
  why2: string;
  why3: string;
  why4: string;
  why5: string;
}

const getToday = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

const initialForm: FormData = {
  nama: "",
  nik: "",
  department: "",
  tanggal: getToday(),
  problem: "",
  otherProblem: "",
  why1: "",
  why2: "",
  why3: "",
  why4: "",
  why5: "",
};

export default function FiveWhyForm({
  testType,
}: FiveWhyFormProps) {
  const [form, setForm] = useState<FormData>(initialForm);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  const updateField = (
    field: keyof FormData,
    value: string
  ) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    setMessage("");

    if (
      !form.nama ||
      !form.nik ||
      !form.department ||
      !form.tanggal ||
      !form.problem ||
      !form.why1 ||
      !form.why2 ||
      !form.why3 ||
      !form.why4 ||
      !form.why5
    ) {
      setMessage("Mohon lengkapi semua data terlebih dahulu.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          testType,
          ...form,
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result.message || "Data gagal dikirim."
        );
      }

      setMessage("Data berhasil dikirim.");

      setForm({
        ...initialForm,
        tanggal: getToday(),
      });
    } catch (error) {
      console.error(error);

      setMessage(
        error instanceof Error
          ? error.message
          : "Terjadi kesalahan saat mengirim data."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const whyFields = [
    {
      label: "Why 1",
      field: "why1" as keyof FormData,
    },
    {
      label: "Why 2",
      field: "why2" as keyof FormData,
    },
    {
      label: "Why 3",
      field: "why3" as keyof FormData,
    },
    {
      label: "Why 4",
      field: "why4" as keyof FormData,
    },
    {
      label: "Why 5",
      field: "why5" as keyof FormData,
    },
  ];

  const inputClass =
    "w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm font-medium text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100";

  const selectClass =
    "w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm font-medium text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100";

  return (
    <div className="min-h-screen bg-slate-100 px-4 py-8 text-slate-900">
      <div className="mx-auto max-w-4xl">
        <header className="mb-6 border-b-2 border-slate-900 pb-4">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h1 className="text-xl font-bold text-slate-950 sm:text-2xl">
                Basic Analysis - 5 Why Analysis
              </h1>

              <p className="mt-1 text-sm font-medium text-slate-600">
                {testType === "pretest"
                  ? "Pre-Test"
                  : "Post-Test"}
              </p>
            </div>

            <div className="hidden text-right sm:block">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Training
              </p>
              <p className="text-sm font-bold text-slate-900">
                Quality Analysis
              </p>
            </div>
          </div>
        </header>

        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7"
        >
          <div className="mb-7">
            <h2 className="mb-4 text-lg font-bold text-slate-950">
              Data Peserta
            </h2>

            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <div>
                <label className="mb-1.5 block text-sm font-semibold text-slate-900">
                  Nama
                </label>

                <input
                  type="text"
                  value={form.nama}
                  onChange={(e) =>
                    updateField("nama", e.target.value)
                  }
                  placeholder="Masukkan nama"
                  className={inputClass}
                />
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-semibold text-slate-900">
                  NIK
                </label>

                <input
                  type="text"
                  value={form.nik}
                  onChange={(e) =>
                    updateField("nik", e.target.value)
                  }
                  placeholder="Masukkan NIK"
                  className={inputClass}
                />
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-semibold text-slate-900">
                  Department
                </label>

                <select
                  value={form.department}
                  onChange={(e) =>
                    updateField(
                      "department",
                      e.target.value
                    )
                  }
                  className={selectClass}
                >
                  <option value="" className="text-slate-400">
                    Pilih Department
                  </option>

                  {DEPARTMENTS.map((department) => (
                    <option
                      key={department}
                      value={department}
                      className="text-slate-900"
                    >
                      {department}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-semibold text-slate-900">
                  Tanggal
                </label>

                <input
                  type="date"
                  value={form.tanggal}
                  onChange={(e) =>
                    updateField(
                      "tanggal",
                      e.target.value
                    )
                  }
                  className={inputClass}
                />
              </div>
            </div>
          </div>

          <div className="mb-6">
            <label className="mb-2 block text-sm font-bold text-slate-950">
              Problem
            </label>

            <select
              value={form.problem}
              onChange={(e) => {
                updateField("problem", e.target.value);

                if (e.target.value !== "Other") {
                  updateField("otherProblem", "");
                }
              }}
              className={selectClass}
            >
              <option value="" className="text-slate-400">
                Pilih Problem
              </option>

              {PROBLEMS.map((problem) => (
                <option
                  key={problem}
                  value={problem}
                  className="text-slate-900"
                >
                  {problem}
                </option>
              ))}
            </select>

            {form.problem === "Other" && (
              <div className="mt-3">
                <label className="mb-1.5 block text-sm font-semibold text-slate-900">
                  Problem Lainnya
                </label>

                <input
                  type="text"
                  value={form.otherProblem}
                  onChange={(e) =>
                    updateField("otherProblem", e.target.value)
                  }
                  placeholder="Tuliskan problem"
                  className={inputClass}
                />
              </div>
            )}
          </div>

          <div>
            <h2 className="mb-3 text-lg font-bold text-slate-950">
              5 Why Analysis
            </h2>

            <div className="overflow-hidden rounded-lg border border-slate-300">
              <div className="grid grid-cols-[90px_1fr] bg-slate-100">
                <div className="border-r border-slate-300 px-3 py-3 text-center text-sm font-bold text-slate-950">
                  5Why
                </div>

                <div className="px-3 py-3 text-sm font-bold text-slate-950">
                  Description
                </div>
              </div>

              {whyFields.map((item) => (
                <div
                  key={item.field}
                  className="grid grid-cols-[90px_1fr] border-t border-slate-300"
                >
                  <div className="flex items-start justify-center border-r border-slate-300 bg-white px-2 py-4 text-sm font-bold text-slate-900">
                    {item.label}
                  </div>

                  <div className="p-2">
                    <textarea
                      value={form[item.field]}
                      onChange={(e) =>
                        updateField(
                          item.field,
                          e.target.value
                        )
                      }
                      rows={3}
                      placeholder={`Tuliskan analisis ${item.label}...`}
                      className="w-full resize-y rounded-md border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {message && (
            <div
              className={`mt-5 rounded-lg px-4 py-3 text-sm font-semibold ${
                message.includes("berhasil")
                  ? "bg-green-50 text-green-700"
                  : "bg-red-50 text-red-700"
              }`}
            >
              {message}
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-6 w-full rounded-lg bg-blue-600 px-4 py-3 text-sm font-bold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting
              ? "Mengirim..."
              : "Submit Test"}
          </button>
        </form>
      </div>
    </div>
  );
}