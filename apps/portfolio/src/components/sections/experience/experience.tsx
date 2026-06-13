import { Button } from "@workspace/ui/components/button"

export default function Experience() {
  return (
    <section className="w-full py-24 lg:py-32" id="about">
      <div className="px-4 md:px-6">
        <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2">
          {/**/}
          <div className="space-y-4">
            <h2 className="text-4xl leading-tight font-bold tracking-tighter sm:text-5xl md:text-5xl md:leading-tight lg:text-6xl lg:leading-tight">
              My Experience
            </h2>

            <div className="space-y-4">
              <p className="max-w-175 text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                test
              </p>

              <div className="flex gap-2">
                <Button variant="outline">View Resume</Button>
                <Button>Learn More</Button>
              </div>
            </div>
          </div>

          {/**/}
        </div>
      </div>
    </section>
  )
}
