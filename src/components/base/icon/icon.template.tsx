import {
  ArrowDownIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
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

interface IconTemplateProps {
  icon: string;
  width?: string | number;
  height?: string | number;
}

const IconMapper: Record<string, React.FC<IconType>> = {
  arrowRight: ArrowRightIcon,
  arrowLeft: ArrowLeftIcon,
  arrowDown: ArrowDownIcon,
  play: PlayIcon,
  quote: QuoteIcon,
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

export const IconTemplate: React.FC<IconTemplateProps> = ({ icon, width, height }) => {
  const Icon = IconMapper[icon];

  if (!Icon) {
    return null;
  }

  return <Icon width={width} height={height} />;
};
