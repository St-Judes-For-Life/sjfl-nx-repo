import { MailIcon, PhoneCallIcon } from 'lucide-react';

import {
  Button,
  Card,
  CardContent,
  DateFormatter,
  Input,
  Label,
  Text,
  Textarea,
} from '@sjfl/ui';
import { AdminJudian } from '@sjfl/data';
import { FC } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';

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
  const [createdDate] = judian.createdAt.split(' ');
  const { register } = useForm<JudianForm>({
    defaultValues: judian,
  });
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
          <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-6">
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
              <Button variant={'destructive'}>Deactivate</Button>
              <Button variant={'default'}>Save</Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
