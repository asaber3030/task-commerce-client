import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function About() {
  return (
    <div className='min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-4xl mx-auto'>
        <h1 className='text-4xl font-bold text-center mb-12 text-gray-900'>About Me</h1>

        <Card className='mb-8'>
          <CardHeader>
            <CardTitle>Professional Web Developer</CardTitle>
          </CardHeader>
          <CardContent>
            <div className='space-y-4'>
              <p className='text-gray-600'>
                With over 5 years of experience in web development, I specialize in creating modern,
                responsive, and user-friendly websites using the latest technologies.
              </p>

              <h3 className='text-xl font-semibold mt-6'>Skills</h3>
              <div className='grid grid-cols-2 md:grid-cols-3 gap-4'>
                {["React", "Next.js", "TypeScript", "Node.js", "Tailwind CSS", "PostgreSQL"].map(
                  (skill) => (
                    <div key={skill} className='bg-gray-100 rounded-lg p-3 text-center'>
                      {skill}
                    </div>
                  )
                )}
              </div>

              <h3 className='text-xl font-semibold mt-6'>Experience</h3>
              <div className='space-y-4'>
                <div>
                  <h4 className='font-medium'>Senior Web Developer - Tech Corp</h4>
                  <p className='text-gray-600'>2021 - Present</p>
                  <p className='text-gray-600'>Led development of enterprise web applications</p>
                </div>
                <div>
                  <h4 className='font-medium'>Web Developer - Digital Agency</h4>
                  <p className='text-gray-600'>2019 - 2021</p>
                  <p className='text-gray-600'>Developed responsive websites for various clients</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
