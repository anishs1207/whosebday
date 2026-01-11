import Image from "next/image";

export default function About() {
  return (
    <section id="about" className="py-20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2">
            <div className="relative h-[350px] w-full">
              <Image
                src="/bday.png"
                alt="About WhoseBday"
                fill
                className="object-contain"
              />
            </div>
          </div>
          <div className="md:w-1/2 space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold">About WhoseBday</h2>
            <p className="text-gray-400">
              Ever forgotten a birthday, anniversary, or important event? <strong>WhoseBday</strong> is here to make sure that never happens again.
            </p>
            <p className="text-gray-400">
              With WhoseBday, you can easily add, view, and manage all your important dates—from birthdays and anniversaries to personal events—all in one place.
            </p>
            <p className="text-gray-400">
              Stay ahead with a beautiful calendar view, upcoming event highlights, and timely reminders. Since launching in 2023, WhoseBday has helped users build better habits around thoughtfulness and memory.
            </p>
            <p className="text-gray-400">
              It’s simple, elegant, and built to make your relationships stronger—one reminder at a time.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
