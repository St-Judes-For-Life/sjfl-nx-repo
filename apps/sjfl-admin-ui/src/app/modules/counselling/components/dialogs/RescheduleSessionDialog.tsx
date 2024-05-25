import { zodResolver } from '@hookform/resolvers/zod';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@radix-ui/react-popover';
import { UpdateCounsellingSessionAdminRequest } from '@sjfl/data';
import {
  Button,
  Calendar,
  DateFormatter,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  Input,
  Textarea,
  cn,
  parseDateTime,
} from '@sjfl/ui';
import { format, subDays } from 'date-fns';
import { CalendarIcon, Clock } from 'lucide-react';
import { useRef, useState } from 'react';
import { SubmitErrorHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { useUpdateCounsellingSession } from '../../hooks/useUpdateCounsellingSession';

const RescheduleFormSchema = z.object({
  date: z.date({
    required_error: 'Date is required.',
  }),
  time: z.string({
    required_error: 'Time is required.',
  }),
  note: z.string().optional(),
});

type RescheduleForm = z.infer<typeof RescheduleFormSchema>;

export const RescheduleSessionDialog = ({ id }: { id: string }) => {
  const [open, setOpen] = useState(false);
  const timeInputRef = useRef<HTMLInputElement>(null);
  const form = useForm<RescheduleForm>({
    resolver: zodResolver(RescheduleFormSchema),
    defaultValues: {
      time: '',
      note: '',
    },
  });

  const { mutateAsync: rescheduleSession, isPending } =
    useUpdateCounsellingSession();

  const onSubmit = async (data: RescheduleForm) => {
    const dateString = parseDateTime(data.date, data.time);
    const session: UpdateCounsellingSessionAdminRequest = {
      counsellingDate: dateString,
      statusNote: data.note,
      counsellingStatus: 'RESCHEDULED',
    };

    const resp = await rescheduleSession({ id, session });
    console.log(resp);
  };
  const onError: SubmitErrorHandler<RescheduleForm> = (err) => {
    console.log(err);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button type="submit" variant="tertiary">
          Reschedule
        </Button>
      </DialogTrigger>
      <DialogContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit, onError)}>
            <DialogHeader>
              <DialogTitle>Reschedule Session</DialogTitle>
              <DialogDescription>
                Are you sure you want to reschedule this session?
              </DialogDescription>
            </DialogHeader>
            <div className="grid my-8 gap-4">
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Suggested Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={'outline'}
                            className={cn(
                              'pl-3 text-left font-normal',
                              !field.value && 'text-muted-foreground'
                            )}
                          >
                            {field.value ? (
                              format(field.value, 'dd-MM-yyyy')
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent
                        className="w-auto p-0 relative z-[999]"
                        align="start"
                      >
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date < subDays(new Date(), 1) ||
                            date < new Date('1900-01-01')
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="time"
                render={({ field: { ref, ...field } }) => (
                  <div className="cursor-pointer">
                    <FormItem
                      className="flex flex-col"
                      onClick={() => timeInputRef.current?.showPicker()}
                    >
                      <FormLabel>Suggested Time</FormLabel>
                      <div className="relative">
                        <Input
                          ref={timeInputRef}
                          className={cn(
                            !field.value && 'text-muted-foreground'
                          )}
                          type="time"
                          {...field}
                          id="time"
                          value={field.value}
                          placeholder="hh:mm AM/PM"
                        />

                        <Clock className="h-4 w-4 opacity-40 absolute right-4 top-2" />
                      </div>
                    </FormItem>
                  </div>
                )}
              />
              <div className="grid gap-2">
                <FormField
                  control={form.control}
                  name="note"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Note</FormLabel>
                      <Textarea
                        id="note"
                        {...field}
                        value={field.value}
                        placeholder="Add reason for rescheduling"
                      />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant={'outline'} disabled={isPending}>
                  Cancel
                </Button>
              </DialogClose>
              <Button loading={isPending} type="submit" variant={'tertiary'}>
                Reschedule
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
