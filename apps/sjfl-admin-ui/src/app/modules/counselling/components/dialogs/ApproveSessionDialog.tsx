import { zodResolver } from '@hookform/resolvers/zod';
import { CounsellingStatus } from '@sjfl/data';
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
import { FC, useState } from 'react';
import { SubmitErrorHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { useUpdateCounsellingSession } from '../../hooks/useUpdateCounsellingSession';
import { UpdateSessionModal } from '../../models/UpdateSessionModal';
import { UpdateCounsellingSessionAdminRequest } from '../../models/AdminCounselling';

const ApproveFormSchema = z.object({
  note: z.string().optional(),
});

type ApproveForm = z.infer<typeof ApproveFormSchema>;

export const ApproveSessionDialog: FC<UpdateSessionModal> = ({
  id,
  currentStatus,
  disabled,
  onUpdate,
}) => {
  const [open, setOpen] = useState(false);

  const action =
    currentStatus.toLowerCase() === 'accepted' ? 'Complete' : 'Approve';
  const updateStatusTo: CounsellingStatus =
    currentStatus.toLowerCase() === 'accepted' ? 'COMPLETED' : 'ACCEPTED';

  const form = useForm<ApproveForm>({
    resolver: zodResolver(ApproveFormSchema),
    defaultValues: {
      note: '',
    },
  });

  const { mutateAsync: approveSession, isPending } =
    useUpdateCounsellingSession();

  const onSubmit = async (data: ApproveForm) => {
    const session: UpdateCounsellingSessionAdminRequest = {
      counsellingStatus: updateStatusTo,
      statusNote: data.note,
    };

    const resp = await approveSession({ id, session });
    if (resp.status === 200) {
      setOpen(false);
      onUpdate();
    }
  };
  const onError: SubmitErrorHandler<ApproveForm> = (err) => {
    console.log(err);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button type="submit" variant="success" disabled={disabled}>
          {action}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit, onError)}>
            <DialogHeader>
              <DialogTitle>{action} Session</DialogTitle>
              <DialogDescription>
                Are you sure you want to {action} this session?
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
                        placeholder="Add note"
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
              <Button loading={isPending} type="submit" variant={'success'}>
                {action}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
