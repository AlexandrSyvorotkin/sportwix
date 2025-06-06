import * as AccordionPrimitive from '@radix-ui/react-accordion'
import * as React from 'react'
import { cn } from '../../utils/utils'
import PlusIcon from '../../assets/plus/Icon_plus.svg'

const Accordion = AccordionPrimitive.Root

const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item ref={ref} className={cn('', className)} {...props} />
))
AccordionItem.displayName = 'AccordionItem'

const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, asChild, ...props }, ref) => (
  <AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn('flex flex-1 items-center justify-between transition-all', className)}
      {...props}
    >
      {asChild ? (
        children
      ) : (
        <>
          {children}
          <div className="transition-transform duration-300 data-[state=open]:rotate-45">
            <img src={PlusIcon} alt="" />
          </div>
        </>
      )}
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
))
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName

const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className={cn(
      'overflow-hidden transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down',
      className
    )}
    {...props}
  >
    <div className={cn('pb-4', className)}>{children}</div>
  </AccordionPrimitive.Content>
))

AccordionContent.displayName = AccordionPrimitive.Content.displayName

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
