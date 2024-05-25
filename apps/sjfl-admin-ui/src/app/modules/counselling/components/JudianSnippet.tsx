import { UserResponse } from '@sjfl/data';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  Card,
  CardContent,
  Text,
} from '@sjfl/ui';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';

type JudianSnippetProps = {
  judian: UserResponse;
};

export const JudianSnippet: FC<JudianSnippetProps> = ({ judian }) => {
  const navigate = useNavigate();
  const onViewProfileBtnClick = () => {
    navigate(`/judians/${judian.uid}`);
  };
  return (
    <div className="grid gap-4">
      <Card>
        <CardContent className="flex flex-col items-center justify-center gap-4">
          <Avatar color="red">
            <AvatarImage
              src={judian.imageUrl ?? `https://robohash.org/${judian.uid}`}
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <Text as="h2" className="text-base">
            {judian.name}
          </Text>
          <Text className="text-base">{judian.mobileNumber}</Text>
          <Button
            type="button"
            variant={'default'}
            onClick={onViewProfileBtnClick}
          >
            View Profile
          </Button>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="flex flex-col gap-2">
          <Text as="h2" className="mb-3 font-bold">
            Information
          </Text>
          <div className="flex flex-col gap-2">
            <UserInfo info="Date Of Birth" value={judian.dateOfBirth} />
            <UserInfo info="Gender" value={judian.gender} />
            <UserInfo info="UID" value={judian.uid} />
            <UserInfo info="Judian Since" value={judian.createdAt} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const UserInfo = ({ info, value }: { info: string; value: string }) => {
  return (
    <div className="flex items-center justify-between gap-5">
      <Text as={'h5'}>{info}</Text>
      <Text>{value ?? 'N/A'}</Text>
    </div>
  );
};
