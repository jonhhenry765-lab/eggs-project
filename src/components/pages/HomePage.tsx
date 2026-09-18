import React from 'react';
import { HeroSection } from '../home/HeroSection';
import { StatsSection } from '../home/StatsSection';
import { CategoriesSection } from '../home/CategoriesSection';
import { FeaturedProducts } from '../home/FeaturedProducts';
import { SpecialOfferBanner } from '../home/SpecialOfferBanner';
import { WhyChooseUs } from '../home/WhyChooseUs';
import { FarmStorySection } from '../home/FarmStorySection';
import { FarmingProcess } from '../home/FarmingProcess';
import { ProductBenefits } from '../home/ProductBenefits';
import { CustomerReviews } from '../home/CustomerReviews';
import { FaqSection } from '../home/FaqSection';

export const HomePage: React.FC = () => {
  return (
    <div className="w-full">
      {/* 1. Hero Section */}
      <HeroSection />

      {/* 2. Trust Statistics */}
      <StatsSection />

      {/* 3. Shop by Category */}
      <CategoriesSection />

      {/* 4. Featured Products with Tabs */}
      <FeaturedProducts />

      {/* 5. Special Promotional Banner */}
      <SpecialOfferBanner />

      {/* 6. Why Choose Us */}
      <WhyChooseUs />

      {/* 7. Farm Heritage Story */}
      <FarmStorySection />

      {/* 8. 6-Step Farming Process */}
      <FarmingProcess />

      {/* 9. Product Benefits */}
      <ProductBenefits />

      {/* 10. Customer Reviews */}
      <CustomerReviews />

      {/* 11. Frequently Asked Questions */}
      <FaqSection />
    </div>
  );
};
