import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function FAQ() {
  const faqs = [
    {
      question: "What technologies do you specialize in?",
      answer:
        "I specialize in modern web technologies including React, Next.js, TypeScript, Node.js, and various CSS frameworks like Tailwind CSS. I stay up-to-date with the latest developments in web development to ensure I'm using the best tools for each project."
    },
    {
      question: "How long does a typical project take?",
      answer:
        "Project timelines vary depending on complexity and requirements. A simple website might take 2-4 weeks, while more complex applications can take 2-3 months or more. I'll provide a detailed timeline estimate after understanding your specific needs."
    },
    {
      question: "Do you provide ongoing maintenance?",
      answer:
        "Yes, I offer ongoing maintenance and support services to ensure your website stays up-to-date and functions smoothly. This includes regular updates, bug fixes, and performance optimization."
    },
    {
      question: "What is your development process?",
      answer:
        "My development process includes initial consultation, planning, design approval, development, testing, and deployment. I maintain clear communication throughout and provide regular updates on progress."
    },
    {
      question: "Do you work with clients remotely?",
      answer:
        "Yes, I work with clients globally and have established efficient remote collaboration processes using tools like Zoom, Slack, and project management software."
    }
  ];

  return (
    <div className='min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-3xl mx-auto'>
        <h1 className='text-4xl font-bold text-center mb-12 text-gray-900'>
          Frequently Asked Questions
        </h1>

        <Card>
          <CardHeader>
            <CardTitle>Common Questions</CardTitle>
          </CardHeader>
          <CardContent>
            <Accordion type='single' collapsible className='w-full'>
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger>{faq.question}</AccordionTrigger>
                  <AccordionContent>{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>

            <div className='mt-4 border-gray-200'>
              <p className='text-gray-600'>
                Don't see your question here? Feel free to reach out through the contact page.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
