import {
  ArrowDownIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  CodeIcon,
  LightbulbIcon,
  PeopleIcon,
  PlayIcon,
  ProductCampaignIcon,
  ProductConfiguredCommerceIcon,
  ProductContentManagementSystemIcon,
  ProductContentMarketingPlatformIcon,
  ProductDataPlatformIcon,
  ProductDigitalAssetManagementIcon,
  ProductFeatureExperimentationIcon,
  ProductPersonalizationIcon,
  ProductWebExperimentationIcon,
  QuoteIcon,
} from "./icons";

export type IconType = { width?: string | number; height?: string | number };

const IconMapper = {
  arrowRight: ArrowRightIcon,
  arrowLeft: ArrowLeftIcon,
  arrowDown: ArrowDownIcon,
  play: PlayIcon,
  quote: QuoteIcon,
  lightbulb: LightbulbIcon,
  people: PeopleIcon,
  code: CodeIcon,
  campaign: ProductCampaignIcon,
  commerceConnect: ProductConfiguredCommerceIcon,
  contentManagementSystem: ProductContentManagementSystemIcon,
  contentMarketingPlatform: ProductContentMarketingPlatformIcon,
  dataPlatform: ProductDataPlatformIcon,
  digitalAssetManagement: ProductDigitalAssetManagementIcon,
  featureExperimentation: ProductFeatureExperimentationIcon,
  personalization: ProductPersonalizationIcon,
  webExperimentation: ProductWebExperimentationIcon,
};
interface IconTemplateProps {
  icon: string;
  width?: string | number;
  height?: string | number;
}

export const IconTemplate: React.FC<IconTemplateProps> = ({ icon, width, height }) => {
  const Icon = IconMapper[icon as keyof typeof IconMapper];

  if (!Icon) {
    return null;
  }

  return <Icon width={width} height={height} />;
};
