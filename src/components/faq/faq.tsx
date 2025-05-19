import { Container } from "@shared/main-page-container";
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
    <Container>
      <div className="mt-[120px] pb-[120px] flex flex-col gap-4 justify-center items-center w-full">
        <h2 className="xl:text-[57px] lg:text-[40px] md:text-[32px] sm:text-[24px] text-center mb-[52px]">Часто задаваемые вопросы</h2>
        <div className="flex flex-col gap-4 xl:w-3/4 lg:w-3/4 md:w-full sm:w-full">
          {QUESTIONS.map((question) => (
            <Accordion key={question.id} type="single" collapsible >
              <AccordionItem value={question.id.toString()} className="bg-[#0F0F0F] rounded-[10px] border-none">
                <AccordionTrigger className="text-left xl:text-[21px] lg:text-[16px] md:text-[14px] sm:text-[13px] xl:px-[40px] xl:py-[32px] lg:px-[25] lg:py-[32] md:px-[20px] md:py-[20px] hover:no-underline">
                  {question.question}
                </AccordionTrigger>
                <AccordionContent className="text-left xl:px-[40px] xl:text-[19px] lg:px-[25px] lg:text-[16px] md:px-[20px] md:text-[14px] sm:px-[13px] sm:text-[13px] text-white/70">
                  {question.answer}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          ))}
        </div>
      </div>
    </Container>
  );
};


export default FAQ;
