import { Card, CardContent } from '../../../../ui/components/Card';
import { Input } from '../../../../ui/components/Input';
import { Label } from '../../../../ui/components/Label';
import { Text } from '../../../../ui/components/Text';
import { MailIcon, PhoneCallIcon } from 'lucide-react';
import { Textarea } from '../../../../ui/components/TextArea';
import { Button } from '../../../../ui/components/Button';
export const JudianInfo = () => {
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
              <Text className="text-lg">23/11/2023</Text>
            </div>
            <div className="flex gap-8 items-center justify-center">
              <PhoneCallIcon size={32} />
              <MailIcon size={32} />
            </div>
          </div>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-6">
            <span>
              <Label htmlFor="uid">UID</Label>
              <Input id="uid"></Input>
            </span>
            <span>
              <Label htmlFor="name">Name</Label>
              <Input id="name"></Input>
            </span>
            <span>
              <Label htmlFor="phone">Mobile</Label>
              <Input id="phone"></Input>
            </span>
            <span>
              <Label htmlFor="email">Email</Label>
              <Input id="email"></Input>
            </span>
            <span>
              <Label htmlFor="gender">Gender</Label>
              <Input id="gender"></Input>
            </span>
            <span>
              <Label htmlFor="dob">DOB</Label>
              <Input id="dob"></Input>
            </span>
            <span>
              <Label htmlFor="guardianName">Guardian Name</Label>
              <Input id="guardianName"></Input>
            </span>
            <span>
              <Label htmlFor="guardianRelationship">
                Guardian Relationship
              </Label>
              <Input id="guardianRelationship"></Input>
            </span>
            <span>
              <Label htmlFor="guardianPhone">Guardian Mobile</Label>
              <Input id="guardianPhone"></Input>
            </span>
            <span>
              <Label htmlFor="guardianEmail">Guardian Email</Label>
              <Input id="guardianEmail"></Input>
            </span>
            <span>
              <Label htmlFor="address">Full Address</Label>
              <Textarea id="address"></Textarea>
            </span>
            <div className="mt-2 flex gap-6 justify-end">
              <Button variant={'destructive'}>Deactivate</Button>
              <Button variant={'default'}>Save</Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
