import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../../ui/accordion/accordion";

const QUESTIONS = [
  {
    id: 1,
    question: "Как создать аккаунт? Как восстановить пароль?",
    answer: "Для регистрации в приложении, вам нужно будет ввести свой номер телефона и подтвердить его.",
  },
  {
    id: 1,
    question: "Как создать аккаунт? Как восстановить пароль?",
    answer: "Для регистрации в приложении, вам нужно будет ввести свой номер телефона и подтвердить его.",
  },
  {
    id: 1,
    question: "Какие данные можно анализировать? Как создавать инфографики?",
    answer: "Для регистрации в приложении, вам нужно будет ввести свой номер телефона и подтвердить его.",
  },
  {
    id: 1,
    question: "Как связаться с поддержкой?",
    answer: "Для регистрации в приложении, вам нужно будет ввести свой номер телефона и подтвердить его.",
  }
]

const FAQ = () => {
  return (
    <div className="mt-[120px] pb-[120px] flex flex-col gap-4 justify-center items-center">
      <h2 className="text-[57px] text-center mb-[52px]">Часто задаваемые вопросы</h2>
      <div className="flex flex-col gap-4 w-[1200px]">
        {QUESTIONS.map((question) => (
          <Accordion key={question.id} type="single" collapsible>
            <AccordionItem 
              value={question.id.toString()} 
              className="bg-[#0F0F0F] rounded-[10px] border-none"
            >
              <AccordionTrigger className="text-[21px] px-[40px] py-[32px] hover:no-underline">
                {question.question}
              </AccordionTrigger>
              <AccordionContent className="px-[40px] text-[19px] text-white/70">
                {question.answer}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        ))}
      </div>
    </div>
  );
};


export default FAQ;
