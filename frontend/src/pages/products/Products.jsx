import { useState } from "react";
import ProductCard from "../../components/ProductCard/ProductCard";
import Header from "../../components/Header/Header";
import Filters from "../../components/Filters/Filters";
import Pill from "../../components/PillsSection/Pill";
import SortHover from "../../components/SortHover/SortHover";
import CategoryModal from "../../components/CategoryModal/CategoryModal";
import CountryList from "../../constants/countries.json";
import FilterSection from "../../components/PillsSection/FilterSection";
import SizeList from "../../constants/sizes.json";
import Pills from "../../constants/pills.json";
import useFilter from "../../hooks/useFilter";
import useGetProducts from "../../hooks/useGetProducts";
import useSectionHoverModal from "../../hooks/useSectionHoverModal";
import usePill from "../../hooks/usePill";


const Products = ({ section = "men" }) => {

  //GET PRODUCTS
  const {products,filteredProducts, setFilteredProducts} = useGetProducts({section});
  
  //APPLY FILTERS
  const { appliedFilters, updateParams } = useFilter({products, setFilteredProducts});

  //SHOW SECTION HOVER MENU
  const {hoveredTab,  isModalOpen, setIsModalOpen, handleMouseEnter, handleMouseLeave} = useSectionHoverModal();
  
  //HANDLE PILLS SECTION
  const { selectedPill, handlePillClick } = usePill();

  return (
    <div className="h-screen flex flex-col overflow-y-auto bg-gray-50">
      <Header
        setIsModalOpen={setIsModalOpen}
        hoveredTab={hoveredTab}
        handleMouseEnter={handleMouseEnter}
        handleMouseLeave={handleMouseLeave}
      />

      <div className="mt-20 px-[5%] flex  overflow-hidden z-10 w-[100%]  h-screen overflow-y-auto ">
        <aside className="w-1/6 h-screen border-r border-gray-300 ">
          <div className="h-13 ">
            <h2 className="text-sm font-bold  p-4 ">FILTERS</h2>
          </div>
          <Filters
            products={products}
            setFilteredProducts={setFilteredProducts}
            section={section}
            appliedFilters = {appliedFilters}
            updateParams={updateParams}
          />
        </aside>

        <main className="w-5/6 h-cover">
          <div className="h-13 flex justify-start items-center gap-1 px-4">
            <div className="flex justify-start w-[100%] gap-2">
              {Pills.filterPills.map((pill) => (
                <Pill
                  itemKey={pill.id}
                  value={pill.value}
                  selectedPill={selectedPill}
                  handlePillClick={handlePillClick}
                />
              ))}
            </div>
            <SortHover />
          </div>
          {
            //ORIGIN COUNTRY FILTER SECTION
            selectedPill == 1 && (
              <div
                className="grid grid-cols-[repeat(auto-fit,_minmax(100px,100px))] py-2  px-4 gap-x-8 gap-y-1"
                style={{ boxShadow: "0 4px 4px -4px rgba(0, 0, 0, 0.2)" }}
              >
                {CountryList.originCountries.map((country) => (
                  <FilterSection
                    key={country.id}
                    itemKey={country.key}
                    value={country.value}
                    updateParams={updateParams}
                    group="origin"
                    selectedValues = {appliedFilters.origin}
                  />
                ))}
              </div>
            )
          }
          {
            //SIZE FILTER SECTION 
            selectedPill == 2 && (
              <div
                className="grid grid-cols-[repeat(auto-fit,_minmax(100px,100px))] py-2  px-4 gap-x-8 gap-y-1 shadow-b-lg"
                style={{ boxShadow: "0 4px 4px -4px rgba(0, 0, 0, 0.2)" }}
              >
                {SizeList.availableSizes.map((size) => (
                  <FilterSection
                    key={size.id}
                    itemKey={size.key}
                    value={size.value}
                    updateParams={updateParams}
                    group="size"
                    selectedValues = {appliedFilters.size}
                  />
                ))}
              </div>
            )
          }
          <div className="flex justify-start w-[100%] gap-2 px-4">
              {[...appliedFilters.origin, ...appliedFilters.size].map((pill,idx) => (
                <Pill
                   key={idx}
                  //itemKey={pill.id}
                  value={pill}
                  //selectedPill={selectedPill}
                  handlePillClick={handlePillClick}
                  secondary
                />
              ))}
            </div>
          <div className="grid grid-cols-[repeat(auto-fit,_minmax(200px,200px))] gap-7 p-4 ">
            {filteredProducts.map((item) => (
              <div key={item.id}>
                <ProductCard item={item} />
              </div>
            ))}
          </div>
        </main>
      </div>
      {isModalOpen && (
        <CategoryModal
          hoveredTab={hoveredTab}
          handleMouseLeave={handleMouseLeave}
          handleMouseEnter={handleMouseEnter}
          setModsetIsModalOpenalOpen={setIsModalOpen}
        />
      )}
    </div>
  );
};

export default Products;
