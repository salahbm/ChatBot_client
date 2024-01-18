import Image from 'next/image';
import Link from 'next/link';
import { Button } from '../ui/button';
const Hero: React.FC = () => {
  return (
    <section className="grid lg:grid-cols-2 place-items-center pt-16 pb-8 md:pt-8 px-8">
      <div>
        <h1 className="text-5xl lg:text-6xl xl:text-7xl font-bold lg:tracking-tight text-neutral-800">
          Marketing website done with Chat
          <span className="text-orange-400">Bot</span>
        </h1>
        <p className="text-lg mt-4 text-slate-600 max-w-xl">
          ChatBot is a starter template for startups, marketing websites &
          landing pages.
          <wbr /> Explore with NextJs, TailwindCSS & Django. You can quickly
          create any website with this starter.
        </p>
        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <Link href="#" target="_blank" rel="noopener">
            <Button type="button" variant={'default'}>
              Get Started
            </Button>
          </Link>
          <Link rel="noopener" href="/" target="_blank">
            <Button type="button" variant={'outline'}>
              View Repo
            </Button>
          </Link>
        </div>
      </div>
      <div className="py-6 md:order-1 ">
        <Image
          src="/assets/images/hero.png"
          alt="Astronaut in the air"
          loading="eager"
          width={500}
          height={500}
        />
      </div>
    </section>
  );
};

export default Hero;
