/**
 * Single source of truth for services, categories and per-page SEO copy.
 * Nav, category pages, service pages, sitemap and JSON-LD are all derived
 * from this file — add a service here and every surface picks it up.
 */

export type Service = {
  slug: string;
  name: string;
  /** <title> and h1 use this; keep it keyword-led and Auckland-scoped. */
  seoTitle: string;
  metaDescription: string;
  intro: string;
  bullets: string[];
};

export type Category = {
  slug: string;
  name: string;
  blurb: string;
  metaDescription: string;
  services: Service[];
};

export const CATEGORIES: Category[] = [
  {
    slug: 'lawn-garden-maintenance',
    name: 'Lawn & Garden Maintenance',
    blurb:
      'Regular, reliable upkeep that keeps lawns sharp and gardens under control all year — from weekly mows to seasonal pruning.',
    metaDescription:
      'Lawn and garden maintenance across Auckland — mowing, edging, hedge trimming, pruning, weed control and green waste removal. Free quotes.',
    services: [
      {
        slug: 'lawn-mowing',
        name: 'Lawn mowing',
        seoTitle: 'Lawn Mowing Auckland',
        metaDescription:
          'Reliable lawn mowing across Auckland for homes, rentals and commercial sites. Regular schedules or one-off cuts. Free quotes.',
        intro:
          'A tidy lawn is the fastest way to make a property look cared for. We mow on a schedule that suits the season, so growth never gets away on you through the warmer months.',
        bullets: [
          'Weekly, fortnightly or monthly schedules',
          'One-off cuts for overgrown or long-vacant sections',
          'Clippings removed or mulched back, your choice',
          'Residential, rental and commercial properties',
        ],
      },
      {
        slug: 'lawn-edging',
        name: 'Lawn edging',
        seoTitle: 'Lawn Edging Auckland',
        metaDescription:
          'Crisp lawn edging along paths, drives and garden beds anywhere in Auckland. Sharp lines that make the whole section look finished.',
        intro:
          'Edging is what separates a mown lawn from a properly finished one. We cut clean lines along paths, driveways and garden beds so the boundaries stay sharp between visits.',
        bullets: [
          'Clean definition along paths, drives and borders',
          'Overgrown edges cut back and reshaped',
          'Included with regular mowing or booked on its own',
        ],
      },
      {
        slug: 'weed-control',
        name: 'Weed control',
        seoTitle: 'Weed Control Auckland',
        metaDescription:
          'Weed control for lawns, gardens, paths and driveways across Auckland. Targeted treatment and hand weeding. Free quotes.',
        intro:
          "Auckland's warm, wet seasons are ideal for weeds. We treat and remove them across lawns, beds and paved areas, and come back often enough to stop them re-establishing.",
        bullets: [
          'Lawn, garden bed, path and driveway weeds',
          'Hand weeding where treatment is not appropriate',
          'Ongoing programmes to keep sites on top of regrowth',
        ],
      },
      {
        slug: 'hedge-trimming',
        name: 'Hedge trimming',
        seoTitle: 'Hedge Trimming Auckland',
        metaDescription:
          'Hedge trimming and shaping across Auckland — boundary hedges, screening and formal shapes. Cuttings removed. Free quotes.',
        intro:
          'Hedges only look good when the lines are true. We trim to shape, keep growth dense rather than leggy, and take the cuttings away with us.',
        bullets: [
          'Boundary, screening and formal hedges',
          'Reshaping of overgrown or uneven hedges',
          'All cuttings cleared and removed',
        ],
      },
      {
        slug: 'shrub-and-bush-pruning',
        name: 'Shrub and bush pruning',
        seoTitle: 'Shrub & Bush Pruning Auckland',
        metaDescription:
          'Shrub and bush pruning across Auckland. Pruned for health, shape and flowering, at the right time of year. Free quotes.',
        intro:
          'Pruning at the right time of year keeps shrubs healthy, well-shaped and flowering properly. We work to the plant, not just the hedge trimmer.',
        bullets: [
          'Pruned for shape, health and flowering',
          'Timed to the species and the season',
          'Dead and diseased growth removed',
        ],
      },
      {
        slug: 'tree-pruning',
        name: 'Tree pruning',
        seoTitle: 'Tree Pruning Auckland',
        metaDescription:
          'Tree pruning across Auckland — crown thinning, lifting, deadwooding and clearance from roofs, gutters and power lines.',
        intro:
          'Well-pruned trees are safer, healthier and let far more light into a section. We thin, lift and deadwood, and clear branches away from roofs and gutters.',
        bullets: [
          'Crown thinning, lifting and reduction',
          'Deadwood and damaged limbs removed',
          'Clearance from roofs, gutters and structures',
          'Debris chipped and removed',
        ],
      },
      {
        slug: 'garden-maintenance',
        name: 'Garden maintenance',
        seoTitle: 'Garden Maintenance Auckland',
        metaDescription:
          'Ongoing garden maintenance across Auckland — weeding, pruning, mulching and bed care on a regular schedule. Free quotes.',
        intro:
          'Ongoing care that keeps beds looking deliberate rather than overgrown. We weed, prune, mulch and tidy on a regular round so the garden never gets ahead of you.',
        bullets: [
          'Scheduled visits through the growing season',
          'Weeding, pruning, mulching and bed edging',
          'Seasonal adjustments as planting changes',
        ],
      },
      {
        slug: 'garden-tidy-ups',
        name: 'Garden tidy-ups',
        seoTitle: 'Garden Tidy-Ups Auckland',
        metaDescription:
          'One-off garden tidy-ups across Auckland. Overgrown gardens cut back, cleared and made presentable. Free quotes.',
        intro:
          'A single visit to bring a garden back under control — ideal before an inspection, an open home, or simply when things have got away over a wet spring.',
        bullets: [
          'One-off blitz on overgrown gardens',
          'Cut back, weeded, edged and cleared',
          'All green waste taken away',
        ],
      },
      {
        slug: 'planting-and-transplanting',
        name: 'Planting and transplanting',
        seoTitle: 'Planting & Transplanting Auckland',
        metaDescription:
          'Planting and transplanting across Auckland. Species suited to your site and aspect, planted properly to establish well.',
        intro:
          'Getting the right plant into the right spot, prepared properly so it establishes. We also lift and relocate established plants when a garden is being reworked.',
        bullets: [
          'Species chosen for your soil, aspect and exposure',
          'Beds prepared and plants staked where needed',
          'Established plants lifted and relocated',
        ],
      },
      {
        slug: 'mulching',
        name: 'Mulching',
        seoTitle: 'Mulching Auckland',
        metaDescription:
          'Garden mulching across Auckland — suppress weeds, hold moisture and finish beds neatly. Bark, chip and compost. Free quotes.',
        intro:
          'Mulch does more work than almost anything else in a garden: it holds moisture through dry spells, suppresses weeds, and makes beds look finished.',
        bullets: [
          'Bark, chip and compost mulches',
          'Beds weeded and edged before laying',
          'Depth set to suit the planting',
        ],
      },
      {
        slug: 'fertiliser-application',
        name: 'Fertiliser application',
        seoTitle: 'Fertiliser Application Auckland',
        metaDescription:
          'Lawn and garden fertiliser application across Auckland. Seasonal feeding programmes for thicker lawns and healthier beds.',
        intro:
          'Feeding at the right points in the year is what gives you a thick lawn and strong garden growth, rather than patchy results and bare spots.',
        bullets: [
          'Seasonal lawn feeding programmes',
          'Garden and shrub feeding',
          'Rates matched to the lawn type and season',
        ],
      },
      {
        slug: 'green-waste-removal',
        name: 'Green waste removal',
        seoTitle: 'Green Waste Removal Auckland',
        metaDescription:
          'Green waste removal across Auckland. Prunings, clippings and garden debris loaded and taken away. Free quotes.',
        intro:
          "Everything we cut, we take. And if you have a pile that has been building up, we will clear that too — no need to fill your own bins over a month of Sundays.",
        bullets: [
          'Prunings, clippings and garden debris',
          'Existing piles cleared',
          'Responsibly disposed of or composted',
        ],
      },
      {
        slug: 'tree-removal',
        name: 'Tree removal',
        seoTitle: 'Tree Removal Auckland',
        metaDescription:
          'Tree removal across Auckland. Safe, insured removal with the site cleared afterwards. Free quotes and site assessment.',
        intro:
          'Safe removal of trees that are dead, damaged, unsafe or simply in the wrong place — with the site left clear and tidy afterwards.',
        bullets: [
          'Dead, damaged and unwanted trees',
          'Sectional removal in tight or built-up sites',
          'Debris chipped and removed',
          'Fully insured; council rules checked before we start',
        ],
      },
    ],
  },
  {
    slug: 'property-maintenance',
    name: 'Property Maintenance',
    blurb:
      'Whole-of-property care for owners, landlords and managers — from routine upkeep to full clean-ups between tenancies or before a sale.',
    metaDescription:
      'Property maintenance across Auckland — section clean-ups, rental and lifestyle block upkeep, pre-sale tidy-ups and inspections.',
    services: [
      {
        slug: 'section-clean-ups',
        name: 'Section clean-ups',
        seoTitle: 'Section Clean-Ups Auckland',
        metaDescription:
          'Full section clean-ups across Auckland. Overgrown sections cleared, cut back and taken away. Free quotes.',
        intro:
          'Overgrown sections brought back to something manageable — cut back, cleared, and everything taken away in one go.',
        bullets: [
          'Long grass, scrub and overgrowth cleared',
          'Rubbish and green waste removed',
          'Section left ready for ongoing maintenance',
        ],
      },
      {
        slug: 'vacant-property-clean-ups',
        name: 'Vacant property clean-ups',
        seoTitle: 'Vacant Property Clean-Ups Auckland',
        metaDescription:
          'Vacant property clean-ups across Auckland. Keep empty properties presentable and secure-looking. Free quotes.',
        intro:
          'Empty properties go downhill fast and start to advertise the fact. We keep vacant sites cut back and presentable while they sit between owners or tenants.',
        bullets: [
          'Regular or one-off visits to empty properties',
          'Grounds kept tidy and looking occupied',
          'Reports and photos for off-site owners',
        ],
      },
      {
        slug: 'rental-property-maintenance',
        name: 'Rental property maintenance',
        seoTitle: 'Rental Property Maintenance Auckland',
        metaDescription:
          'Rental property grounds maintenance for Auckland landlords and property managers. Scheduled visits, reliable reporting.',
        intro:
          'Scheduled grounds care for landlords and property managers, so the outside of a rental never becomes the thing that holds up an inspection.',
        bullets: [
          'Regular scheduled visits across a portfolio',
          'Consistent standard between tenancies',
          'Invoicing and reporting suited to managers',
        ],
      },
      {
        slug: 'lifestyle-block-maintenance',
        name: 'Lifestyle block maintenance',
        seoTitle: 'Lifestyle Block Maintenance Auckland',
        metaDescription:
          'Lifestyle block maintenance around Auckland — larger sections, paddock edges, tracks, shelter belts and grounds.',
        intro:
          'Larger sections need different gear and a different rhythm. We handle the grounds around lifestyle blocks — the parts that a tractor is too big for and a push mower too small.',
        bullets: [
          'Larger lawns, verges and track edges',
          'Shelter belts and boundary planting',
          'Seasonal clean-ups across the block',
        ],
      },
      {
        slug: 'real-estate-pre-sale-tidy-ups',
        name: 'Real estate pre-sale tidy-ups',
        seoTitle: 'Pre-Sale Garden Tidy-Ups Auckland',
        metaDescription:
          'Pre-sale property tidy-ups across Auckland. Sharpen the kerb appeal before photos and open homes. Fast turnaround.',
        intro:
          'Buyers form a view before they reach the front door. We sharpen everything the camera and the kerb will see, on a timeline that fits the marketing schedule.',
        bullets: [
          'Turned around before photography and open homes',
          'Lawns, edges, beds and entranceway sharpened',
          'Works in with agents and vendors',
        ],
      },
      {
        slug: 'end-of-tenancy-garden-clean-ups',
        name: 'End-of-tenancy garden clean-ups',
        seoTitle: 'End of Tenancy Garden Clean-Ups Auckland',
        metaDescription:
          'End-of-tenancy garden clean-ups across Auckland. Bring grounds back to standard between tenants. Free quotes.',
        intro:
          'Bringing the grounds back to the standard the tenancy agreement expects — mown, weeded, cut back and cleared, ready for the next tenant or the final inspection.',
        bullets: [
          'Lawns, beds and edges restored',
          'Rubbish and green waste cleared',
          'Fast turnaround between tenancies',
        ],
      },
      {
        slug: 'property-inspections-and-maintenance',
        name: 'Property inspections and maintenance',
        seoTitle: 'Property Inspections & Maintenance Auckland',
        metaDescription:
          'Grounds inspections and ongoing maintenance for Auckland property owners and managers. Regular reporting.',
        intro:
          'Regular eyes on the property, with the small jobs handled before they turn into expensive ones. Useful for owners who are off-site or overseas.',
        bullets: [
          'Scheduled inspection visits',
          'Issues flagged with photos',
          'Routine maintenance handled on the same visit',
        ],
      },
    ],
  },
  {
    slug: 'outdoor-cleaning',
    name: 'Outdoor Cleaning',
    blurb:
      "Auckland's damp climate grows moss, mould and grime on every hard surface. We wash it off — carefully, and without damaging what is underneath.",
    metaDescription:
      'Outdoor cleaning across Auckland — driveway, path, patio, deck and fence cleaning, house soft washing and gutter cleaning.',
    services: [
      {
        slug: 'driveway-cleaning',
        name: 'Driveway cleaning',
        seoTitle: 'Driveway Cleaning Auckland',
        metaDescription:
          'Driveway cleaning across Auckland. Moss, mould, lichen and grime removed from concrete, pavers and exposed aggregate.',
        intro:
          'Years of moss, lichen and grime lift off and the original colour comes back. Concrete, pavers and exposed aggregate all handled at the right pressure.',
        bullets: [
          'Concrete, pavers and exposed aggregate',
          'Moss, mould, lichen and oil staining',
          'Pressure matched to the surface',
        ],
      },
      {
        slug: 'pathway-cleaning',
        name: 'Pathway cleaning',
        seoTitle: 'Pathway Cleaning Auckland',
        metaDescription:
          'Path and walkway cleaning across Auckland. Slippery moss and algae removed to make paths safe again.',
        intro:
          'Paths get slippery long before they look dirty. Cleaning them is as much a safety job as a cosmetic one, especially over a wet Auckland winter.',
        bullets: [
          'Slip-causing moss and algae removed',
          'Steps, walkways and side paths',
          'Safer footing through the wet months',
        ],
      },
      {
        slug: 'patio-cleaning',
        name: 'Patio cleaning',
        seoTitle: 'Patio Cleaning Auckland',
        metaDescription:
          'Patio and paved area cleaning across Auckland. Bring tiles, pavers and concrete back to their original colour.',
        intro:
          'Outdoor living areas take the brunt of the weather. A proper clean brings tiles and pavers back to their original colour and makes the space usable again.',
        bullets: [
          'Tiles, pavers and stamped concrete',
          'Grime, mould and organic staining',
          'Furniture moved and replaced',
        ],
      },
      {
        slug: 'deck-cleaning',
        name: 'Deck cleaning',
        seoTitle: 'Deck Cleaning Auckland',
        metaDescription:
          'Deck cleaning across Auckland. Timber and composite decks cleaned safely, ready for oiling or staining.',
        intro:
          'Decks need a gentler approach than concrete — too much pressure furs the timber. We clean at a pressure the boards can take, and leave them ready to oil.',
        bullets: [
          'Timber and composite decking',
          'Pressure controlled to protect the boards',
          'Prepared ready for oiling or staining',
        ],
      },
      {
        slug: 'fence-cleaning',
        name: 'Fence cleaning',
        seoTitle: 'Fence Cleaning Auckland',
        metaDescription:
          'Fence cleaning across Auckland. Mould, moss and green film removed from timber, PVC and painted fences.',
        intro:
          'Fences pick up a green film on the shaded side within a season or two. Washing it back makes a bigger difference to a boundary than most people expect.',
        bullets: [
          'Timber, PVC and painted fences',
          'Mould, moss and algae removed',
          'Prepared for re-staining if required',
        ],
      },
      {
        slug: 'exterior-house-washing',
        name: 'Exterior house washing',
        seoTitle: 'Exterior House Washing Auckland',
        metaDescription:
          'Exterior house washing across Auckland. Soft wash where appropriate to protect cladding, paint and joinery.',
        intro:
          'We soft wash wherever the cladding calls for it. High pressure on the wrong surface forces water into places it should not go — the gentler method cleans just as well without that risk.',
        bullets: [
          'Soft wash used where appropriate',
          'Weatherboard, plaster, brick and cladding systems',
          'Joinery, eaves and soffits included',
          'Plants covered and rinsed down afterwards',
        ],
      },
      {
        slug: 'gutter-cleaning',
        name: 'Gutter cleaning',
        seoTitle: 'Gutter Cleaning Auckland',
        metaDescription:
          'Gutter cleaning across Auckland. Blocked gutters and downpipes cleared before they overflow. Free quotes.',
        intro:
          'Blocked gutters overflow into the walls and ceiling long before anyone notices from the ground. Clearing them before the winter rain is cheap insurance.',
        bullets: [
          'Gutters and downpipes cleared',
          'Debris removed from site',
          'Flow checked before we leave',
        ],
      },
    ],
  },
  {
    slug: 'landscaping',
    name: 'Landscaping',
    blurb:
      'Reworking gardens rather than just maintaining them — new beds, new planting, and the finishing materials that hold it all together.',
    metaDescription:
      'Landscaping across Auckland — garden makeovers, new installations, bark and mulch, planting, decorative stone and garden beds.',
    services: [
      {
        slug: 'garden-makeovers',
        name: 'Garden makeovers',
        seoTitle: 'Garden Makeovers Auckland',
        metaDescription:
          'Garden makeovers across Auckland. Tired gardens redesigned, replanted and rebuilt. Free quotes and site visit.',
        intro:
          'For gardens that maintenance alone will not save. We clear what is not working, rework the layout, and replant with something suited to the site.',
        bullets: [
          'Existing planting assessed and cleared',
          'Layout reworked around how you use the space',
          'Replanted and mulched to finish',
        ],
      },
      {
        slug: 'new-garden-installations',
        name: 'New garden installations',
        seoTitle: 'New Garden Installation Auckland',
        metaDescription:
          'New garden installation across Auckland. Gardens built from bare ground — soil, planting and finishing.',
        intro:
          'Building a garden from bare ground, whether that is a new build with nothing but clay and builders mix, or a section being started again.',
        bullets: [
          'Ground prepared and soil improved',
          'Planting plan suited to aspect and exposure',
          'Finished with mulch or decorative stone',
        ],
      },
      {
        slug: 'bark-and-mulch-installation',
        name: 'Bark and mulch installation',
        seoTitle: 'Bark & Mulch Installation Auckland',
        metaDescription:
          'Bark and mulch supply and installation across Auckland. Beds prepared, edged and laid to an even depth.',
        intro:
          'Supplied and laid properly — beds weeded and edged first, then spread to an even depth so it does the job rather than just looking fresh for a fortnight.',
        bullets: [
          'Bark, wood chip and compost mulches',
          'Beds weeded and edged before laying',
          'Even depth, neatly finished at the edges',
        ],
      },
      {
        slug: 'plant-and-shrub-installation',
        name: 'Plant and shrub installation',
        seoTitle: 'Plant & Shrub Installation Auckland',
        metaDescription:
          'Plant and shrub installation across Auckland. Sourced, planted and staked to establish properly. Free quotes.',
        intro:
          'Sourcing and planting to suit the position — sun, shade, wind and soil all get a say in what actually thrives on an Auckland section.',
        bullets: [
          'Plants sourced to suit the site',
          'Planted, staked and fed to establish',
          'Advice on watering through the first summer',
        ],
      },
      {
        slug: 'decorative-stone-and-pebble-installation',
        name: 'Decorative stone and pebble installation',
        seoTitle: 'Decorative Stone & Pebble Installation Auckland',
        metaDescription:
          'Decorative stone and pebble installation across Auckland. Low-maintenance finishes for beds, borders and paths.',
        intro:
          'A low-maintenance finish that holds its look for years. Laid over proper matting so the stone stays clean instead of sinking into the soil.',
        bullets: [
          'Scoria, river stone, pebble and chip',
          'Weed matting laid underneath',
          'Clean edges against lawn and paths',
        ],
      },
      {
        slug: 'garden-bed-creation',
        name: 'Garden bed creation',
        seoTitle: 'Garden Bed Creation Auckland',
        metaDescription:
          'New garden bed creation across Auckland. Beds shaped, edged, filled and planted. Free quotes and site visit.',
        intro:
          'New beds cut, shaped and edged, then filled with good soil so what goes in has something to grow in. Raised beds built where drainage or access calls for it.',
        bullets: [
          'Beds shaped and edged cleanly',
          'Quality soil and compost supplied',
          'Raised beds built where needed',
        ],
      },
    ],
  },
  {
    slug: 'commercial-services',
    name: 'Commercial Services',
    blurb:
      'Scheduled contract maintenance for commercial sites, schools and body corporates — consistent standards, predictable invoicing.',
    metaDescription:
      'Commercial grounds maintenance across Auckland — offices, retail, schools and body corporates. Scheduled contracts, fully insured.',
    services: [
      {
        slug: 'commercial-property-maintenance',
        name: 'Commercial property maintenance',
        seoTitle: 'Commercial Property Maintenance Auckland',
        metaDescription:
          'Commercial property grounds maintenance across Auckland. Scheduled contracts, consistent standards, fully insured.',
        intro:
          'Grounds care for commercial sites where the standard has to be the same every visit, and the invoicing has to be predictable enough to budget against.',
        bullets: [
          'Scheduled contract maintenance',
          'Consistent standard across multiple sites',
          'Fully insured and health-and-safety compliant',
        ],
      },
      {
        slug: 'school-grounds-maintenance',
        name: 'School grounds maintenance',
        seoTitle: 'School Grounds Maintenance Auckland',
        metaDescription:
          'School grounds maintenance across Auckland. Police-checked staff, work scheduled around school hours. Fully insured.',
        intro:
          'Grounds work on school sites, scheduled around teaching hours and holidays. Our team is police checked, which matters on any site with children on it.',
        bullets: [
          'Police-checked team members',
          'Work scheduled around school hours and terms',
          'Fields, playgrounds, gardens and boundaries',
        ],
      },
      {
        slug: 'office-and-retail-landscaping',
        name: 'Office and retail landscaping',
        seoTitle: 'Office & Retail Landscaping Auckland',
        metaDescription:
          'Office and retail landscaping across Auckland. Entranceways, carparks and frontages kept sharp for customers.',
        intro:
          'The frontage is the first thing customers and staff see. We keep entranceways, carparks and planted areas looking deliberate rather than neglected.',
        bullets: [
          'Entranceways, frontages and carpark planting',
          'Planting refreshed seasonally',
          'Out-of-hours work available',
        ],
      },
      {
        slug: 'body-corporate-maintenance',
        name: 'Body corporate maintenance',
        seoTitle: 'Body Corporate Grounds Maintenance Auckland',
        metaDescription:
          'Body corporate grounds maintenance across Auckland. Shared grounds, common areas and driveways. Scheduled contracts.',
        intro:
          'Shared grounds need one contractor with one standard, not a rotating cast. We handle common areas, driveways and communal planting on a set schedule.',
        bullets: [
          'Common areas, driveways and shared grounds',
          'Reporting suited to committees and managers',
          'Scheduled contracts with predictable invoicing',
        ],
      },
      {
        slug: 'regular-scheduled-maintenance-contracts',
        name: 'Regular scheduled maintenance contracts',
        seoTitle: 'Scheduled Maintenance Contracts Auckland',
        metaDescription:
          'Regular scheduled grounds maintenance contracts across Auckland. Fixed schedules, agreed scope, predictable cost.',
        intro:
          'An agreed scope, a set schedule and a known cost. The simplest way to stop grounds maintenance being something anyone has to think about.',
        bullets: [
          'Scope and frequency agreed up front',
          'Fixed, predictable invoicing',
          'Scaled across single sites or portfolios',
        ],
      },
    ],
  },
];

/** Flat list of every service, with its parent category attached. */
export const ALL_SERVICES = CATEGORIES.flatMap((category) =>
  category.services.map((service) => ({ ...service, category }))
);

export function findService(categorySlug: string, serviceSlug: string) {
  const category = CATEGORIES.find((c) => c.slug === categorySlug);
  const service = category?.services.find((s) => s.slug === serviceSlug);
  return category && service ? { category, service } : null;
}
