import { MailIcon, PhoneCallIcon } from 'lucide-react';

import {
  Button,
  Card,
  CardContent,
  Input,
  Label,
  Text,
  Textarea,
  filterEmptyProps,
  useToast,
} from '@sjfl/ui';
import { FC } from 'react';
import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { useUpdateJudian } from '../hooks/useUpdateJudian';
import { AdminJudian } from '../models/Judians';

const JudianSchema = z.object({
  uid: z.string(),
  fullName: z.string(),
  mobileNo: z.string(),
  dateOfBirth: z.date().optional().nullable(),
  gender: z.string().optional().nullable(),
  email: z.string().email().optional().nullable(),
  guardianName: z.string().optional().nullable(),
  guardianRelationship: z.string().optional().nullable(),
  guardianMobile: z.string().optional().nullable(),
  guardianEmail: z.string().optional().nullable(),
  fullAddress: z.string().optional().nullable(),
});

type JudianForm = z.infer<typeof JudianSchema>;

type JudianInfoProps = {
  judian: AdminJudian;
};

export const JudianInfo: FC<JudianInfoProps> = ({ judian }) => {
  const { mutateAsync: updateJudian, isPending: isUpdatingJudian } =
    useUpdateJudian();
  const { register, handleSubmit } = useForm<JudianForm>({
    defaultValues: {
      uid: judian.uid,
      fullName: judian.fullName,
      mobileNo: judian.mobileNo,
      dateOfBirth: judian.dateOfBirth,
      gender: judian.gender,
      email: judian.email,
      guardianName: judian.guardianName,
      guardianRelationship: judian.guardianRelationship,
      guardianMobile: judian.guardianMobile,
      guardianEmail: judian.guardianEmail,
      fullAddress: judian.fullAddress,
    },
  });
  const { toast } = useToast();

  const [createdDate] = judian.createdAt.split(' ');

  const onSubmit: SubmitHandler<JudianForm> = async (data) => {
    const { uid, ...judian } = data;
    const resp = await updateJudian({ uid, judian: filterEmptyProps(judian) });
    if (resp.status === 200) {
      toast({
        title: 'Judian',
        description: 'Update was successful',
      });
    }
    console.log(resp);
  };

  const onError: SubmitErrorHandler<JudianForm> = (err) => {
    console.log(err);
  };

  return (
    <Card className="h-full">
      <CardContent>
        <div className="grid md:grid-cols-[1fr,3fr] grid-cols-1 gap-4">
          <div className="grid gap-4 auto-rows-min">
            <img
              src="/person.png"
              className="h-80 object-cover mx-auto"
              alt="person-placeholder"
            />
            <div className="flex gap-3 items-center justify-center">
              <Text as={'h5'}>Judian Since </Text>
              <Text className="text-lg">{createdDate}</Text>
            </div>
            <div className="flex gap-8 items-center justify-center">
              <a href={'tel:' + judian.mobileNo}>
                <PhoneCallIcon size={32} />
              </a>
              <a href={'mailto:' + judian.email} target="__blank">
                <MailIcon size={32} />
              </a>
            </div>
          </div>
          <form
            onSubmit={handleSubmit(onSubmit, onError)}
            className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-6"
          >
            <span>
              <Label htmlFor="uid">UID</Label>
              <Input id="uid" disabled {...register('uid')}></Input>
            </span>
            <span>
              <Label htmlFor="name">Name</Label>
              <Input id="name" {...register('fullName')}></Input>
            </span>
            <span>
              <Label htmlFor="phone">Mobile</Label>
              <Input
                id="phone"
                type="tel"
                inputMode="tel"
                {...register('mobileNo')}
              ></Input>
            </span>
            <span>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                inputMode="email"
                {...register('email')}
              ></Input>
            </span>
            <span>
              <Label htmlFor="gender">Gender</Label>
              <Input id="gender" {...register('gender')}></Input>
            </span>
            <span>
              <Label htmlFor="dob">DOB</Label>
              <Input id="dob" {...register('dateOfBirth')}></Input>
            </span>
            <span>
              <Label htmlFor="guardianName">Guardian Name</Label>
              <Input id="guardianName" {...register('guardianName')}></Input>
            </span>
            <span>
              <Label htmlFor="guardianRelationship">
                Guardian Relationship
              </Label>
              <Input
                id="guardianRelationship"
                {...register('guardianRelationship')}
              ></Input>
            </span>
            <span>
              <Label htmlFor="guardianPhone">Guardian Mobile</Label>
              <Input
                id="guardianPhone"
                type="tel"
                inputMode="tel"
                {...register('guardianMobile')}
              ></Input>
            </span>
            <span>
              <Label htmlFor="guardianEmail">Guardian Email</Label>
              <Input
                id="guardianEmail"
                type="email"
                inputMode="email"
                {...register('guardianEmail')}
              ></Input>
            </span>
            <span>
              <Label htmlFor="address">Full Address</Label>
              <Textarea id="address" {...register('fullAddress')}></Textarea>
            </span>
            <div className="mb-4 flex gap-4 justify-end items-end">
              <Button variant={'destructive'} disabled={isUpdatingJudian}>
                Deactivate
              </Button>
              <Button variant={'default'} loading={isUpdatingJudian}>
                Save
              </Button>
            </div>
          </form>
        </div>
      </CardContent>
    </Card>
  );
};
