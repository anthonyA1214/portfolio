import { Button } from "@workspace/ui/components/button"
import { DotLottieReact } from "@lottiefiles/dotlottie-react"
import loaderCat from "@/assets/lotties/loader-cat.json"

export default function About() {
  return (
    <section className="w-full py-24 lg:py-32" id="about">
      <div className="px-4 md:px-6">
        <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2">
          {/**/}
          <div className="space-y-4">
            <h2 className="text-4xl leading-tight font-bold tracking-tighter sm:text-5xl md:text-5xl md:leading-tight lg:text-6xl lg:leading-tight">
              About Me
            </h2>

            <div className="space-y-4">
              <p className="max-w-175 text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                I&apos;m a full stack developer with a passion for building
                clean and functional web applications. I have experience working
                across the entire stack, from front-end interfaces to back-end
                logic, and I&apos;m always eager to learn new technologies and
                take on new challenges.
              </p>

              <div className="flex gap-2">
                <Button variant="outline">View Resume</Button>
                <Button>Learn More</Button>
              </div>
            </div>
          </div>

          {/**/}
          <DotLottieReact
            data={loaderCat}
            autoplay
            loop
            className="hidden shrink-0 md:block"
            layout={{
              fit: "contain",
            }}
          />
        </div>
      </div>
    </section>
  )
}
