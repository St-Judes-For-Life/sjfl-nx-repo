import { Tabs, TabsContent, TabsList, TabsTrigger } from '@sjfl/ui';
import { Page } from '../../../components/Page';
import { JudianAidRequests } from '../components/JudianAidRequests';
import { JudianInfo } from '../components/JudianInfo';
import { JudianSessions } from '../components/JudianSessions';
import { useFetchJudian } from '../hooks/useFetchJudian';
import { useParams } from 'react-router-dom';

export const JudianDetailPage = () => {
  const { uid } = useParams();
  if (!uid) {
    throw Error('ID not found');
  }
  const { data: judianResp, isLoading } = useFetchJudian(uid);

  const judian = judianResp?.data;

  if (judian)
    return (
      <Page
        breadcrumbs={[
          { title: 'Judians', link: '/judians' },
          { title: judian.fullName },
        ]}
      >
        <Tabs defaultValue="info" className="">
          <TabsList className="grid grid-cols-3 w-full md:w-[50vw]">
            <TabsTrigger value="info">Judian Info</TabsTrigger>
            <TabsTrigger value="aid">Aid Requests</TabsTrigger>
            <TabsTrigger value="counselling">Counselling Sessions</TabsTrigger>
          </TabsList>
          <TabsContent value="info">
            <JudianInfo judian={judian} />
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
