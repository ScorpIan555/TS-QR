import Calendar from "@/components/Calendar";

export default function Landing() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      <h1 className="text-3xl font-bold mb-6">Appointment Generator</h1>
      <Calendar />
    </div>
  );
}
