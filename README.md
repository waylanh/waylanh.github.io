#Maps

```
// json for maps
{
    width: integer,                // required for embed tool; width of StoryMap
    height: integer,               // required for embed tool; height of StoryMap
    font_css: string,              // optional; font set
    calculate_zoom: true,              // optional; defaults to true.
    storymap: {
        language: string,          // required; two-letter ISO language code
        map_type: string,          // required
        map_as_image: false,       // required
        map_subdomains: string,    // optional
        slides: [object]           // required; array of slide objects (see below)
    }
}
/*
For map_types
stamen:toner-lite - the default
stamen:toner - high-contrast black and white
stamen:toner-lines - just the lines (mostly roads) from the Toner style
stamen:toner-labels - just the labels (place names and roads) from the Toner style
stamen:watercolor - an artistic representation
osm:standard - maps used by OpenStreetMap 
*/

// [object] in slides
{
    type: "overview",      // optional; if present must be set to "overview"
    location: {            // required for all slides except "overview" slide
        lat: decimal,      // latitude of point on map
        lon: decimal       // longitude of point on map
    },
    text: {                // optional if media present
        headline: string,
        text: string       // may contain HTML markup
    },
    media: {               // optional if text present
        url: string,       // url for featured media
        caption: string,   // optional; brief explanation of media content
        credit: string     // optional; creator of media content
    }
}
```


#Timelines
