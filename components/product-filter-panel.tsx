import { Checkbox } from "@/components/ui/checkbox"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"

interface FilterOption {
  id: string
  label: string
  count?: number
}

interface FilterGroupProps {
  title: string
  options: FilterOption[]
}

function FilterGroup({ title, options }: FilterGroupProps) {
  return (
    <div className="space-y-4">
      <h3 className="font-medium">{title}</h3>
      <div className="space-y-2">
        {options.map((option) => (
          <div key={option.id} className="flex items-center gap-2">
            <Checkbox id={option.id} />
            <Label htmlFor={option.id} className="text-sm font-normal">
              {option.label}
              {option.count !== undefined && <span className="ml-1 text-muted-foreground">({option.count})</span>}
            </Label>
          </div>
        ))}
      </div>
    </div>
  )
}

interface PriceRangeProps {
  min: number
  max: number
}

function PriceRange({ min, max }: PriceRangeProps) {
  return (
    <div className="space-y-4">
      <h3 className="font-medium">Price Range</h3>
      <Slider defaultValue={[min, max]} min={0} max={200} step={1} className="py-4" />
      <div className="flex items-center justify-between">
        <span className="text-sm">${min}</span>
        <span className="text-sm">${max}</span>
      </div>
    </div>
  )
}

export interface ProductFilterPanelProps {
  categories?: FilterOption[]
  sizes?: FilterOption[]
  colors?: FilterOption[]
  brands?: FilterOption[]
  priceRange?: PriceRangeProps
  materials?: FilterOption[]
  features?: FilterOption[]
}

export function ProductFilterPanel({
  categories,
  sizes,
  colors,
  brands,
  priceRange = { min: 0, max: 200 },
  materials,
  features,
}: ProductFilterPanelProps) {
  return (
    <Accordion type="multiple" defaultValue={["price", "categories", "brands"]} className="space-y-6">
      <AccordionItem value="price" className="border-none">
        <AccordionTrigger className="py-2 text-base">Price</AccordionTrigger>
        <AccordionContent>
          <PriceRange min={priceRange.min} max={priceRange.max} />
        </AccordionContent>
      </AccordionItem>

      {categories && (
        <AccordionItem value="categories" className="border-none">
          <AccordionTrigger className="py-2 text-base">Categories</AccordionTrigger>
          <AccordionContent>
            <FilterGroup title="" options={categories} />
          </AccordionContent>
        </AccordionItem>
      )}

      {brands && (
        <AccordionItem value="brands" className="border-none">
          <AccordionTrigger className="py-2 text-base">Brands</AccordionTrigger>
          <AccordionContent>
            <FilterGroup title="" options={brands} />
          </AccordionContent>
        </AccordionItem>
      )}

      {sizes && (
        <AccordionItem value="sizes" className="border-none">
          <AccordionTrigger className="py-2 text-base">Sizes</AccordionTrigger>
          <AccordionContent>
            <FilterGroup title="" options={sizes} />
          </AccordionContent>
        </AccordionItem>
      )}

      {colors && (
        <AccordionItem value="colors" className="border-none">
          <AccordionTrigger className="py-2 text-base">Colors</AccordionTrigger>
          <AccordionContent>
            <FilterGroup title="" options={colors} />
          </AccordionContent>
        </AccordionItem>
      )}

      {materials && (
        <AccordionItem value="materials" className="border-none">
          <AccordionTrigger className="py-2 text-base">Materials</AccordionTrigger>
          <AccordionContent>
            <FilterGroup title="" options={materials} />
          </AccordionContent>
        </AccordionItem>
      )}

      {features && (
        <AccordionItem value="features" className="border-none">
          <AccordionTrigger className="py-2 text-base">Features</AccordionTrigger>
          <AccordionContent>
            <FilterGroup title="" options={features} />
          </AccordionContent>
        </AccordionItem>
      )}
    </Accordion>
  )
}

