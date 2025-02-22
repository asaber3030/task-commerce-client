import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Contact() {
  return (
    <div className='min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-2xl mx-auto'>
        <h1 className='text-4xl font-bold text-center mb-12 text-gray-900'>Contact Me</h1>

        <Card>
          <CardHeader>
            <CardTitle>Send a Message</CardTitle>
          </CardHeader>
          <CardContent>
            <form className='space-y-6'>
              <div>
                <label htmlFor='name' className='block text-sm font-medium text-gray-700'>
                  Name
                </label>
                <Input id='name' name='name' type='text' required className='mt-1' />
              </div>

              <div>
                <label htmlFor='email' className='block text-sm font-medium text-gray-700'>
                  Email
                </label>
                <Input id='email' name='email' type='email' required className='mt-1' />
              </div>

              <div>
                <label htmlFor='message' className='block text-sm font-medium text-gray-700'>
                  Message
                </label>
                <Textarea id='message' name='message' rows={4} required className='mt-1' />
              </div>

              <Button type='submit' className='w-full'>
                Send Message
              </Button>
            </form>

            <div className='mt-8 pt-8 border-t border-gray-200'>
              <h3 className='text-lg font-medium text-gray-900'>Other Ways to Reach Me</h3>
              <div className='mt-4 space-y-2'>
                <p className='text-gray-600'>Email: contact@example.com</p>
                <p className='text-gray-600'>Phone: (555) 123-4567</p>
                <p className='text-gray-600'>Location: San Francisco, CA</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
