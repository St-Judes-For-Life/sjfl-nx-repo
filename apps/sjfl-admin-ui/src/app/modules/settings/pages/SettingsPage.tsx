import { Link } from 'react-router-dom';
import { Page } from '../../../components/Page';
import { Card, CardContent, Text } from '@sjfl/ui';

export const SettingsPage = () => {
  const SETTINGS_CONFIG = [
    {
      path: 'manage-aid',
      header: 'Aid',
      context: 'Manage Aid Streams and Informations',
    },
    {
      path: 'manage-approvers',
      header: 'Approvers',
      context: 'Manage workdflow approvers',
    },
    {
      path: 'manage-counselling',
      header: 'Counselling',
      context: 'Manage Counsellors',
    },
    {
      path: 'manage-languages',
      header: 'Languages',
      context: 'Manage language for localization',
    },
  ];
  return (
    <Page title={'Settings'}>
      <div className="flex flex-col gap-4">
        {SETTINGS_CONFIG.map((config) => (
          <Link to={`/settings/${config.path}`} key={config.header}>
            <Card>
              <CardContent className="flex gap-4">
                <div className="flex flex-col">
                  <Text as={'h5'}>{config.header}</Text>
                  <Text as={'p'}>{config.context}</Text>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </Page>
  );
};
