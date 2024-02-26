import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '../../../../ui/components/Tabs';
import { Page } from '../../../components/Page';
import { JudianAidRequests } from '../components/JudianAidRequests';
import { JudianInfo } from '../components/JudianInfo';
import { JudianSessions } from '../components/JudianSessions';

export const JudianDetailPage = () => {
  return (
    <Page
      breadcrumbs={[
        { title: 'Judians', link: '/judians' },
        { title: 'Rohit Sharma' },
      ]}
    >
      <Tabs defaultValue="info" className="">
        <TabsList className="grid grid-cols-3 w-full md:w-[50vw]">
          <TabsTrigger value="info">Judian Info</TabsTrigger>
          <TabsTrigger value="aid">Aid Requests</TabsTrigger>
          <TabsTrigger value="counselling">Counselling Sessions</TabsTrigger>
        </TabsList>
        <TabsContent value="info">
          <JudianInfo />
        </TabsContent>
        <TabsContent value="aid">
          <JudianAidRequests />
        </TabsContent>
        <TabsContent value="counselling">
          <JudianSessions />
        </TabsContent>
      </Tabs>
    </Page>
  );
};
