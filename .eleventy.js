module.exports = function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy({
    "src/assets/meta": "/",
    "src/assets/": "assets/",
  });

  eleventyConfig.r

  return {
    dir: {
      input: "src",
      output: "dist"
    }
  }
};