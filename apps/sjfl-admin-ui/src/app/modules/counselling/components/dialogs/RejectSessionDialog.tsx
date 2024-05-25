import { zodResolver } from '@hookform/resolvers/zod';
import { UpdateCounsellingSessionAdminRequest } from '@sjfl/data';
import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Form,
  FormField,
  FormItem,
  FormLabel,
  Textarea,
} from '@sjfl/ui';
import { useState } from 'react';
import { SubmitErrorHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { useUpdateCounsellingSession } from '../../hooks/useUpdateCounsellingSession';

const RejectFormSchema = z.object({
  note: z.string().optional(),
});

type RejectForm = z.infer<typeof RejectFormSchema>;

export const RejectSessionDialog = ({ id }: { id: string }) => {
  const [open, setOpen] = useState(false);
  const form = useForm<RejectForm>({
    resolver: zodResolver(RejectFormSchema),
    defaultValues: {
      note: '',
    },
  });

  const { mutateAsync: rejectSession, isPending } =
    useUpdateCounsellingSession();

  const onSubmit = async (data: RejectForm) => {
    const session: UpdateCounsellingSessionAdminRequest = {
      counsellingStatus: 'REJECTED',
      statusNote: data.note,
    };

    const resp = await rejectSession({ id, session });
    console.log(resp);
  };
  const onError: SubmitErrorHandler<RejectForm> = (err) => {
    console.log(err);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button type="submit" variant="destructive">
          Reject
        </Button>
      </DialogTrigger>
      <DialogContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit, onError)}>
            <DialogHeader>
              <DialogTitle>Reject Session</DialogTitle>
              <DialogDescription>
                Are you sure you want to Reject this session?
              </DialogDescription>
            </DialogHeader>
            <div className="grid my-8 gap-4">
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
                        placeholder="Add reason for rejection"
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
              <Button loading={isPending} type="submit" variant={'destructive'}>
                Reject
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
