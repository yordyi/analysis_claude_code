
// @from(Start 7467733, End 7492812)
rz2 = z((Tn8, sz2) => {
  var Vt1 = Z1("node:path"),
    f1 = GE(),
    Zu = I11(),
    lz2 = new Map([
      ["heic", "heif"],
      ["heif", "heif"],
      ["avif", "avif"],
      ["jpeg", "jpeg"],
      ["jpg", "jpeg"],
      ["jpe", "jpeg"],
      ["tile", "tile"],
      ["dz", "tile"],
      ["png", "png"],
      ["raw", "raw"],
      ["tiff", "tiff"],
      ["tif", "tiff"],
      ["webp", "webp"],
      ["gif", "gif"],
      ["jp2", "jp2"],
      ["jpx", "jp2"],
      ["j2k", "jp2"],
      ["j2c", "jp2"],
      ["jxl", "jxl"]
    ]),
    GG5 = /\.(jp[2x]|j2[kc])$/i,
    iz2 = () => new Error("JP2 output requires libvips with support for OpenJPEG"),
    nz2 = (A) => 1 << 31 - Math.clz32(Math.ceil(Math.log2(A)));

  function ZG5(A, B) {
    let Q;
    if (!f1.string(A)) Q = new Error("Missing output file path");
    else if (f1.string(this.options.input.file) && Vt1.resolve(this.options.input.file) === Vt1.resolve(A)) Q = new Error("Cannot use same file for input and output");
    else if (GG5.test(Vt1.extname(A)) && !this.constructor.format.jp2k.output.file) Q = iz2();
    if (Q)
      if (f1.fn(B)) B(Q);
      else return Promise.reject(Q);
    else {
      this.options.fileOut = A;
      let I = Error();
      return this._pipeline(B, I)
    }
    return this
  }

  function DG5(A, B) {
    if (f1.object(A)) this._setBooleanOption("resolveWithObject", A.resolveWithObject);
    else if (this.options.resolveWithObject) this.options.resolveWithObject = !1;
    this.options.fileOut = "";
    let Q = Error();
    return this._pipeline(f1.fn(A) ? A : B, Q)
  }

  function YG5() {
    return this.options.keepMetadata |= 1, this
  }

  function WG5(A) {
    if (f1.object(A))
      for (let [B, Q] of Object.entries(A))
        if (f1.object(Q))
          for (let [I, G] of Object.entries(Q))
            if (f1.string(G)) this.options.withExif[`exif-${B.toLowerCase()}-${I}`] = G;
            else throw f1.invalidParameterError(`${B}.${I}`, "string", G);
    else throw f1.invalidParameterError(B, "object", Q);
    else throw f1.invalidParameterError("exif", "object", A);
    return this.options.withExifMerge = !1, this.keepExif()
  }

  function JG5(A) {
    return this.withExif(A), this.options.withExifMerge = !0, this
  }

  function FG5() {
    return this.options.keepMetadata |= 8, this
  }

  function XG5(A, B) {
    if (f1.string(A)) this.options.withIccProfile = A;
    else throw f1.invalidParameterError("icc", "string", A);
    if (this.keepIccProfile(), f1.object(B)) {
      if (f1.defined(B.attach))
        if (f1.bool(B.attach)) {
          if (!B.attach) this.options.keepMetadata &= -9
        } else throw f1.invalidParameterError("attach", "boolean", B.attach)
    }
    return this
  }

  function VG5() {
    return this.options.keepMetadata = 31, this
  }

  function CG5(A) {
    if (this.keepMetadata(), this.withIccProfile("srgb"), f1.object(A)) {
      if (f1.defined(A.orientation))
        if (f1.integer(A.orientation) && f1.inRange(A.orientation, 1, 8)) this.options.withMetadataOrientation = A.orientation;
        else throw f1.invalidParameterError("orientation", "integer between 1 and 8", A.orientation);
      if (f1.defined(A.density))
        if (f1.number(A.density) && A.density > 0) this.options.withMetadataDensity = A.density;
        else throw f1.invalidParameterError("density", "positive number", A.density);
      if (f1.defined(A.icc)) this.withIccProfile(A.icc);
      if (f1.defined(A.exif)) this.withExifMerge(A.exif)
    }
    return this
  }

  function KG5(A, B) {
    let Q = lz2.get((f1.object(A) && f1.string(A.id) ? A.id : A).toLowerCase());
    if (!Q) throw f1.invalidParameterError("format", `one of: ${[...lz2.keys()].join(", ")}`, A);
    return this[Q](B)
  }

  function HG5(A) {
    if (f1.object(A)) {
      if (f1.defined(A.quality))
        if (f1.integer(A.quality) && f1.inRange(A.quality, 1, 100)) this.options.jpegQuality = A.quality;
        else throw f1.invalidParameterError("quality", "integer between 1 and 100", A.quality);
      if (f1.defined(A.progressive)) this._setBooleanOption("jpegProgressive", A.progressive);
      if (f1.defined(A.chromaSubsampling))
        if (f1.string(A.chromaSubsampling) && f1.inArray(A.chromaSubsampling, ["4:2:0", "4:4:4"])) this.options.jpegChromaSubsampling = A.chromaSubsampling;
        else throw f1.invalidParameterError("chromaSubsampling", "one of: 4:2:0, 4:4:4", A.chromaSubsampling);
      let B = f1.bool(A.optimizeCoding) ? A.optimizeCoding : A.optimiseCoding;
      if (f1.defined(B)) this._setBooleanOption("jpegOptimiseCoding", B);
      if (f1.defined(A.mozjpeg))
        if (f1.bool(A.mozjpeg)) {
          if (A.mozjpeg) this.options.jpegTrellisQuantisation = !0, this.options.jpegOvershootDeringing = !0, this.options.jpegOptimiseScans = !0, this.options.jpegProgressive = !0, this.options.jpegQuantisationTable = 3
        } else throw f1.invalidParameterError("mozjpeg", "boolean", A.mozjpeg);
      let Q = f1.bool(A.trellisQuantization) ? A.trellisQuantization : A.trellisQuantisation;
      if (f1.defined(Q)) this._setBooleanOption("jpegTrellisQuantisation", Q);
      if (f1.defined(A.overshootDeringing)) this._setBooleanOption("jpegOvershootDeringing", A.overshootDeringing);
      let I = f1.bool(A.optimizeScans) ? A.optimizeScans : A.optimiseScans;
      if (f1.defined(I)) {
        if (this._setBooleanOption("jpegOptimiseScans", I), I) this.options.jpegProgressive = !0
      }
      let G = f1.number(A.quantizationTable) ? A.quantizationTable : A.quantisationTable;
      if (f1.defined(G))
        if (f1.integer(G) && f1.inRange(G, 0, 8)) this.options.jpegQuantisationTable = G;
        else throw f1.invalidParameterError("quantisationTable", "integer between 0 and 8", G)
    }
    return this._updateFormatOut("jpeg", A)
  }

  function zG5(A) {
    if (f1.object(A)) {
      if (f1.defined(A.progressive)) this._setBooleanOption("pngProgressive", A.progressive);
      if (f1.defined(A.compressionLevel))
        if (f1.integer(A.compressionLevel) && f1.inRange(A.compressionLevel, 0, 9)) this.options.pngCompressionLevel = A.compressionLevel;
        else throw f1.invalidParameterError("compressionLevel", "integer between 0 and 9", A.compressionLevel);
      if (f1.defined(A.adaptiveFiltering)) this._setBooleanOption("pngAdaptiveFiltering", A.adaptiveFiltering);
      let B = A.colours || A.colors;
      if (f1.defined(B))
        if (f1.integer(B) && f1.inRange(B, 2, 256)) this.options.pngBitdepth = nz2(B);
        else throw f1.invalidParameterError("colours", "integer between 2 and 256", B);
      if (f1.defined(A.palette)) this._setBooleanOption("pngPalette", A.palette);
      else if ([A.quality, A.effort, A.colours, A.colors, A.dither].some(f1.defined)) this._setBooleanOption("pngPalette", !0);
      if (this.options.pngPalette) {
        if (f1.defined(A.quality))
          if (f1.integer(A.quality) && f1.inRange(A.quality, 0, 100)) this.options.pngQuality = A.quality;
          else throw f1.invalidParameterError("quality", "integer between 0 and 100", A.quality);
        if (f1.defined(A.effort))
          if (f1.integer(A.effort) && f1.inRange(A.effort, 1, 10)) this.options.pngEffort = A.effort;
          else throw f1.invalidParameterError("effort", "integer between 1 and 10", A.effort);
        if (f1.defined(A.dither))
          if (f1.number(A.dither) && f1.inRange(A.dither, 0, 1)) this.options.pngDither = A.dither;
          else throw f1.invalidParameterError("dither", "number between 0.0 and 1.0", A.dither)
      }
    }
    return this._updateFormatOut("png", A)
  }

  function wG5(A) {
    if (f1.object(A)) {
      if (f1.defined(A.quality))
        if (f1.integer(A.quality) && f1.inRange(A.quality, 1, 100)) this.options.webpQuality = A.quality;
        else throw f1.invalidParameterError("quality", "integer between 1 and 100", A.quality);
      if (f1.defined(A.alphaQuality))
        if (f1.integer(A.alphaQuality) && f1.inRange(A.alphaQuality, 0, 100)) this.options.webpAlphaQuality = A.alphaQuality;
        else throw f1.invalidParameterError("alphaQuality", "integer between 0 and 100", A.alphaQuality);
      if (f1.defined(A.lossless)) this._setBooleanOption("webpLossless", A.lossless);
      if (f1.defined(A.nearLossless)) this._setBooleanOption("webpNearLossless", A.nearLossless);
      if (f1.defined(A.smartSubsample)) this._setBooleanOption("webpSmartSubsample", A.smartSubsample);
      if (f1.defined(A.preset))
        if (f1.string(A.preset) && f1.inArray(A.preset, ["default", "photo", "picture", "drawing", "icon", "text"])) this.options.webpPreset = A.preset;
        else throw f1.invalidParameterError("preset", "one of: default, photo, picture, drawing, icon, text", A.preset);
      if (f1.defined(A.effort))
        if (f1.integer(A.effort) && f1.inRange(A.effort, 0, 6)) this.options.webpEffort = A.effort;
        else throw f1.invalidParameterError("effort", "integer between 0 and 6", A.effort);
      if (f1.defined(A.minSize)) this._setBooleanOption("webpMinSize", A.minSize);
      if (f1.defined(A.mixed)) this._setBooleanOption("webpMixed", A.mixed)
    }
    return az2(A, this.options), this._updateFormatOut("webp", A)
  }

  function EG5(A) {
    if (f1.object(A)) {
      if (f1.defined(A.reuse)) this._setBooleanOption("gifReuse", A.reuse);
      if (f1.defined(A.progressive)) this._setBooleanOption("gifProgressive", A.progressive);
      let B = A.colours || A.colors;
      if (f1.defined(B))
        if (f1.integer(B) && f1.inRange(B, 2, 256)) this.options.gifBitdepth = nz2(B);
        else throw f1.invalidParameterError("colours", "integer between 2 and 256", B);
      if (f1.defined(A.effort))
        if (f1.number(A.effort) && f1.inRange(A.effort, 1, 10)) this.options.gifEffort = A.effort;
        else throw f1.invalidParameterError("effort", "integer between 1 and 10", A.effort);
      if (f1.defined(A.dither))
        if (f1.number(A.dither) && f1.inRange(A.dither, 0, 1)) this.options.gifDither = A.dither;
        else throw f1.invalidParameterError("dither", "number between 0.0 and 1.0", A.dither);
      if (f1.defined(A.interFrameMaxError))
        if (f1.number(A.interFrameMaxError) && f1.inRange(A.interFrameMaxError, 0, 32)) this.options.gifInterFrameMaxError = A.interFrameMaxError;
        else throw f1.invalidParameterError("interFrameMaxError", "number between 0.0 and 32.0", A.interFrameMaxError);
      if (f1.defined(A.interPaletteMaxError))
        if (f1.number(A.interPaletteMaxError) && f1.inRange(A.interPaletteMaxError, 0, 256)) this.options.gifInterPaletteMaxError = A.interPaletteMaxError;
        else throw f1.invalidParameterError("interPaletteMaxError", "number between 0.0 and 256.0", A.interPaletteMaxError)
    }
    return az2(A, this.options), this._updateFormatOut("gif", A)
  }

  function UG5(A) {
    if (!this.constructor.format.jp2k.output.buffer) throw iz2();
    if (f1.object(A)) {
      if (f1.defined(A.quality))
        if (f1.integer(A.quality) && f1.inRange(A.quality, 1, 100)) this.options.jp2Quality = A.quality;
        else throw f1.invalidParameterError("quality", "integer between 1 and 100", A.quality);
      if (f1.defined(A.lossless))
        if (f1.bool(A.lossless)) this.options.jp2Lossless = A.lossless;
        else throw f1.invalidParameterError("lossless", "boolean", A.lossless);
      if (f1.defined(A.tileWidth))
        if (f1.integer(A.tileWidth) && f1.inRange(A.tileWidth, 1, 32768)) this.options.jp2TileWidth = A.tileWidth;
        else throw f1.invalidParameterError("tileWidth", "integer between 1 and 32768", A.tileWidth);
      if (f1.defined(A.tileHeight))
        if (f1.integer(A.tileHeight) && f1.inRange(A.tileHeight, 1, 32768)) this.options.jp2TileHeight = A.tileHeight;
        else throw f1.invalidParameterError("tileHeight", "integer between 1 and 32768", A.tileHeight);
      if (f1.defined(A.chromaSubsampling))
        if (f1.string(A.chromaSubsampling) && f1.inArray(A.chromaSubsampling, ["4:2:0", "4:4:4"])) this.options.jp2ChromaSubsampling = A.chromaSubsampling;
        else throw f1.invalidParameterError("chromaSubsampling", "one of: 4:2:0, 4:4:4", A.chromaSubsampling)
    }
    return this._updateFormatOut("jp2", A)
  }

  function az2(A, B) {
    if (f1.object(A) && f1.defined(A.loop))
      if (f1.integer(A.loop) && f1.inRange(A.loop, 0, 65535)) B.loop = A.loop;
      else throw f1.invalidParameterError("loop", "integer between 0 and 65535", A.loop);
    if (f1.object(A) && f1.defined(A.delay))
      if (f1.integer(A.delay) && f1.inRange(A.delay, 0, 65535)) B.delay = [A.delay];
      else if (Array.isArray(A.delay) && A.delay.every(f1.integer) && A.delay.every((Q) => f1.inRange(Q, 0, 65535))) B.delay = A.delay;
    else throw f1.invalidParameterError("delay", "integer or an array of integers between 0 and 65535", A.delay)
  }

  function NG5(A) {
    if (f1.object(A)) {
      if (f1.defined(A.quality))
        if (f1.integer(A.quality) && f1.inRange(A.quality, 1, 100)) this.options.tiffQuality = A.quality;
        else throw f1.invalidParameterError("quality", "integer between 1 and 100", A.quality);
      if (f1.defined(A.bitdepth))
        if (f1.integer(A.bitdepth) && f1.inArray(A.bitdepth, [1, 2, 4, 8])) this.options.tiffBitdepth = A.bitdepth;
        else throw f1.invalidParameterError("bitdepth", "1, 2, 4 or 8", A.bitdepth);
      if (f1.defined(A.tile)) this._setBooleanOption("tiffTile", A.tile);
      if (f1.defined(A.tileWidth))
        if (f1.integer(A.tileWidth) && A.tileWidth > 0) this.options.tiffTileWidth = A.tileWidth;
        else throw f1.invalidParameterError("tileWidth", "integer greater than zero", A.tileWidth);
      if (f1.defined(A.tileHeight))
        if (f1.integer(A.tileHeight) && A.tileHeight > 0) this.options.tiffTileHeight = A.tileHeight;
        else throw f1.invalidParameterError("tileHeight", "integer greater than zero", A.tileHeight);
      if (f1.defined(A.miniswhite)) this._setBooleanOption("tiffMiniswhite", A.miniswhite);
      if (f1.defined(A.pyramid)) this._setBooleanOption("tiffPyramid", A.pyramid);
      if (f1.defined(A.xres))
        if (f1.number(A.xres) && A.xres > 0) this.options.tiffXres = A.xres;
        else throw f1.invalidParameterError("xres", "number greater than zero", A.xres);
      if (f1.defined(A.yres))
        if (f1.number(A.yres) && A.yres > 0) this.options.tiffYres = A.yres;
        else throw f1.invalidParameterError("yres", "number greater than zero", A.yres);
      if (f1.defined(A.compression))
        if (f1.string(A.compression) && f1.inArray(A.compression, ["none", "jpeg", "deflate", "packbits", "ccittfax4", "lzw", "webp", "zstd", "jp2k"])) this.options.tiffCompression = A.compression;
        else throw f1.invalidParameterError("compression", "one of: none, jpeg, deflate, packbits, ccittfax4, lzw, webp, zstd, jp2k", A.compression);
      if (f1.defined(A.predictor))
        if (f1.string(A.predictor) && f1.inArray(A.predictor, ["none", "horizontal", "float"])) this.options.tiffPredictor = A.predictor;
        else throw f1.invalidParameterError("predictor", "one of: none, horizontal, float", A.predictor);
      if (f1.defined(A.resolutionUnit))
        if (f1.string(A.resolutionUnit) && f1.inArray(A.resolutionUnit, ["inch", "cm"])) this.options.tiffResolutionUnit = A.resolutionUnit;
        else throw f1.invalidParameterError("resolutionUnit", "one of: inch, cm", A.resolutionUnit)
    }
    return this._updateFormatOut("tiff", A)
  }

  function $G5(A) {
    return this.heif({
      ...A,
      compression: "av1"
    })
  }

  function qG5(A) {
    if (f1.object(A)) {
      if (f1.string(A.compression) && f1.inArray(A.compression, ["av1", "hevc"])) this.options.heifCompression = A.compression;
      else throw f1.invalidParameterError("compression", "one of: av1, hevc", A.compression);
      if (f1.defined(A.quality))
        if (f1.integer(A.quality) && f1.inRange(A.quality, 1, 100)) this.options.heifQuality = A.quality;
        else throw f1.invalidParameterError("quality", "integer between 1 and 100", A.quality);
      if (f1.defined(A.lossless))
        if (f1.bool(A.lossless)) this.options.heifLossless = A.lossless;
        else throw f1.invalidParameterError("lossless", "boolean", A.lossless);
      if (f1.defined(A.effort))
        if (f1.integer(A.effort) && f1.inRange(A.effort, 0, 9)) this.options.heifEffort = A.effort;
        else throw f1.invalidParameterError("effort", "integer between 0 and 9", A.effort);
      if (f1.defined(A.chromaSubsampling))
        if (f1.string(A.chromaSubsampling) && f1.inArray(A.chromaSubsampling, ["4:2:0", "4:4:4"])) this.options.heifChromaSubsampling = A.chromaSubsampling;
        else throw f1.invalidParameterError("chromaSubsampling", "one of: 4:2:0, 4:4:4", A.chromaSubsampling);
      if (f1.defined(A.bitdepth))
        if (f1.integer(A.bitdepth) && f1.inArray(A.bitdepth, [8, 10, 12])) {
          if (A.bitdepth !== 8 && this.constructor.versions.heif) throw f1.invalidParameterError("bitdepth when using prebuilt binaries", 8, A.bitdepth);
          this.options.heifBitdepth = A.bitdepth
        } else throw f1.invalidParameterError("bitdepth", "8, 10 or 12", A.bitdepth)
    } else throw f1.invalidParameterError("options", "Object", A);
    return this._updateFormatOut("heif", A)
  }

  function MG5(A) {
    if (f1.object(A)) {
      if (f1.defined(A.quality))
        if (f1.integer(A.quality) && f1.inRange(A.quality, 1, 100)) this.options.jxlDistance = A.quality >= 30 ? 0.1 + (100 - A.quality) * 0.09 : 0.017666666666666667 * A.quality * A.quality - 1.15 * A.quality + 25;
        else throw f1.invalidParameterError("quality", "integer between 1 and 100", A.quality);
      else if (f1.defined(A.distance))
        if (f1.number(A.distance) && f1.inRange(A.distance, 0, 15)) this.options.jxlDistance = A.distance;
        else throw f1.invalidParameterError("distance", "number between 0.0 and 15.0", A.distance);
      if (f1.defined(A.decodingTier))
        if (f1.integer(A.decodingTier) && f1.inRange(A.decodingTier, 0, 4)) this.options.jxlDecodingTier = A.decodingTier;
        else throw f1.invalidParameterError("decodingTier", "integer between 0 and 4", A.decodingTier);
      if (f1.defined(A.lossless))
        if (f1.bool(A.lossless)) this.options.jxlLossless = A.lossless;
        else throw f1.invalidParameterError("lossless", "boolean", A.lossless);
      if (f1.defined(A.effort))
        if (f1.integer(A.effort) && f1.inRange(A.effort, 3, 9)) this.options.jxlEffort = A.effort;
        else throw f1.invalidParameterError("effort", "integer between 3 and 9", A.effort)
    }
    return this._updateFormatOut("jxl", A)
  }

  function LG5(A) {
    if (f1.object(A)) {
      if (f1.defined(A.depth))
        if (f1.string(A.depth) && f1.inArray(A.depth, ["char", "uchar", "short", "ushort", "int", "uint", "float", "complex", "double", "dpcomplex"])) this.options.rawDepth = A.depth;
        else throw f1.invalidParameterError("depth", "one of: char, uchar, short, ushort, int, uint, float, complex, double, dpcomplex", A.depth)
    }
    return this._updateFormatOut("raw")
  }

  function RG5(A) {
    if (f1.object(A)) {
      if (f1.defined(A.size))
        if (f1.integer(A.size) && f1.inRange(A.size, 1, 8192)) this.options.tileSize = A.size;
        else throw f1.invalidParameterError("size", "integer between 1 and 8192", A.size);
      if (f1.defined(A.overlap))
        if (f1.integer(A.overlap) && f1.inRange(A.overlap, 0, 8192)) {
          if (A.overlap > this.options.tileSize) throw f1.invalidParameterError("overlap", `<= size (${this.options.tileSize})`, A.overlap);
          this.options.tileOverlap = A.overlap
        } else throw f1.invalidParameterError("overlap", "integer between 0 and 8192", A.overlap);
      if (f1.defined(A.container))
        if (f1.string(A.container) && f1.inArray(A.container, ["fs", "zip"])) this.options.tileContainer = A.container;
        else throw f1.invalidParameterError("container", "one of: fs, zip", A.container);
      if (f1.defined(A.layout))
        if (f1.string(A.layout) && f1.inArray(A.layout, ["dz", "google", "iiif", "iiif3", "zoomify"])) this.options.tileLayout = A.layout;
        else throw f1.invalidParameterError("layout", "one of: dz, google, iiif, iiif3, zoomify", A.layout);
      if (f1.defined(A.angle))
        if (f1.integer(A.angle) && !(A.angle % 90)) this.options.tileAngle = A.angle;
        else throw f1.invalidParameterError("angle", "positive/negative multiple of 90", A.angle);
      if (this._setBackgroundColourOption("tileBackground", A.background), f1.defined(A.depth))
        if (f1.string(A.depth) && f1.inArray(A.depth, ["onepixel", "onetile", "one"])) this.options.tileDepth = A.depth;
        else throw f1.invalidParameterError("depth", "one of: onepixel, onetile, one", A.depth);
      if (f1.defined(A.skipBlanks))
        if (f1.integer(A.skipBlanks) && f1.inRange(A.skipBlanks, -1, 65535)) this.options.tileSkipBlanks = A.skipBlanks;
        else throw f1.invalidParameterError("skipBlanks", "integer between -1 and 255/65535", A.skipBlanks);
      else if (f1.defined(A.layout) && A.layout === "google") this.options.tileSkipBlanks = 5;
      let B = f1.bool(A.center) ? A.center : A.centre;
      if (f1.defined(B)) this._setBooleanOption("tileCentre", B);
      if (f1.defined(A.id))
        if (f1.string(A.id)) this.options.tileId = A.id;
        else throw f1.invalidParameterError("id", "string", A.id);
      if (f1.defined(A.basename))
        if (f1.string(A.basename)) this.options.tileBasename = A.basename;
        else throw f1.invalidParameterError("basename", "string", A.basename)
    }
    if (f1.inArray(this.options.formatOut, ["jpeg", "png", "webp"])) this.options.tileFormat = this.options.formatOut;
    else if (this.options.formatOut !== "input") throw f1.invalidParameterError("format", "one of: jpeg, png, webp", this.options.formatOut);
    return this._updateFormatOut("dz")
  }

  function OG5(A) {
    if (!f1.plainObject(A)) throw f1.invalidParameterError("options", "object", A);
    if (f1.integer(A.seconds) && f1.inRange(A.seconds, 0, 3600)) this.options.timeoutSeconds = A.seconds;
    else throw f1.invalidParameterError("seconds", "integer between 0 and 3600", A.seconds);
    return this
  }

  function TG5(A, B) {
    if (!(f1.object(B) && B.force === !1)) this.options.formatOut = A;
    return this
  }

  function PG5(A, B) {
    if (f1.bool(B)) this.options[A] = B;
    else throw f1.invalidParameterError(A, "boolean", B)
  }

  function SG5() {
    if (!this.options.streamOut) {
      this.options.streamOut = !0;
      let A = Error();
      this._pipeline(void 0, A)
    }
  }

  function _G5(A, B) {
    if (typeof A === "function") {
      if (this._isStreamInput()) this.on("finish", () => {
        this._flattenBufferIn(), Zu.pipeline(this.options, (Q, I, G) => {
          if (Q) A(f1.nativeError(Q, B));
          else A(null, I, G)
        })
      });
      else Zu.pipeline(this.options, (Q, I, G) => {
        if (Q) A(f1.nativeError(Q, B));
        else A(null, I, G)
      });
      return this
    } else if (this.options.streamOut) {
      if (this._isStreamInput()) {
        if (this.once("finish", () => {
            this._flattenBufferIn(), Zu.pipeline(this.options, (Q, I, G) => {
              if (Q) this.emit("error", f1.nativeError(Q, B));
              else this.emit("info", G), this.push(I);
              this.push(null), this.on("end", () => this.emit("close"))
            })
          }), this.streamInFinished) this.emit("finish")
      } else Zu.pipeline(this.options, (Q, I, G) => {
        if (Q) this.emit("error", f1.nativeError(Q, B));
        else this.emit("info", G), this.push(I);
        this.push(null), this.on("end", () => this.emit("close"))
      });
      return this
    } else if (this._isStreamInput()) return new Promise((Q, I) => {
      this.once("finish", () => {
        this._flattenBufferIn(), Zu.pipeline(this.options, (G, Z, D) => {
          if (G) I(f1.nativeError(G, B));
          else if (this.options.resolveWithObject) Q({
            data: Z,
            info: D
          });
          else Q(Z)
        })
      })
    });
    else return new Promise((Q, I) => {
      Zu.pipeline(this.options, (G, Z, D) => {
        if (G) I(f1.nativeError(G, B));
        else if (this.options.resolveWithObject) Q({
          data: Z,
          info: D
        });
        else Q(Z)
      })
    })
  }
  sz2.exports = function(A) {
    Object.assign(A.prototype, {
      toFile: ZG5,
      toBuffer: DG5,
      keepExif: YG5,
      withExif: WG5,
      withExifMerge: JG5,
      keepIccProfile: FG5,
      withIccProfile: XG5,
      keepMetadata: VG5,
      withMetadata: CG5,
      toFormat: KG5,
      jpeg: HG5,
      jp2: UG5,
      png: zG5,
      webp: wG5,
      tiff: NG5,
      avif: $G5,
      heif: qG5,
      jxl: MG5,
      gif: EG5,
      raw: LG5,
      tile: RG5,
      timeout: OG5,
      _updateFormatOut: TG5,
      _setBooleanOption: PG5,
      _read: SG5,
      _pipeline: _G5
    })
  }
})
// @from(Start 7492818, End 7495403)
Aw2 = z((Pn8, ez2) => {
  var jG5 = Z1("node:events"),
    yK1 = LK1(),
    FV = GE(),
    {
      runtimePlatformArch: yG5
    } = Gt1(),
    cD = I11(),
    oz2 = yG5(),
    Ct1 = cD.libvipsVersion(),
    vO = cD.format();
  vO.heif.output.alias = ["avif", "heic"];
  vO.jpeg.output.alias = ["jpe", "jpg"];
  vO.tiff.output.alias = ["tif"];
  vO.jp2k.output.alias = ["j2c", "j2k", "jp2", "jpx"];
  var kG5 = {
      nearest: "nearest",
      bilinear: "bilinear",
      bicubic: "bicubic",
      locallyBoundedBicubic: "lbb",
      nohalo: "nohalo",
      vertexSplitQuadraticBasisSpline: "vsqbs"
    },
    Du = {
      vips: Ct1.semver
    };
  if (!Ct1.isGlobal)
    if (!Ct1.isWasm) try {
      Du = Z1(`@img/sharp-${oz2}/versions`)
    } catch (A) {
      try {
        Du = Z1(`@img/sharp-libvips-${oz2}/versions`)
      } catch (B) {}
    } else try {
      Du = (() => {
        throw new Error("Cannot require module " + "@img/sharp-wasm32/versions");
      })()
    } catch (A) {}
  Du.sharp = Qt1().version;
  if (Du.heif && vO.heif) vO.heif.input.fileSuffix = [".avif"], vO.heif.output.alias = ["avif"];

  function tz2(A) {
    if (FV.bool(A))
      if (A) return cD.cache(50, 20, 100);
      else return cD.cache(0, 0, 0);
    else if (FV.object(A)) return cD.cache(A.memory, A.files, A.items);
    else return cD.cache()
  }
  tz2(!0);

  function xG5(A) {
    return cD.concurrency(FV.integer(A) ? A : null)
  }
  if (yK1.familySync() === yK1.GLIBC && !cD._isUsingJemalloc()) cD.concurrency(1);
  else if (yK1.familySync() === yK1.MUSL && cD.concurrency() === 1024) cD.concurrency(Z1("node:os").availableParallelism());
  var fG5 = new jG5.EventEmitter;

  function vG5() {
    return cD.counters()
  }

  function bG5(A) {
    return cD.simd(FV.bool(A) ? A : null)
  }

  function gG5(A) {
    if (FV.object(A))
      if (Array.isArray(A.operation) && A.operation.every(FV.string)) cD.block(A.operation, !0);
      else throw FV.invalidParameterError("operation", "Array<string>", A.operation);
    else throw FV.invalidParameterError("options", "object", A)
  }

  function hG5(A) {
    if (FV.object(A))
      if (Array.isArray(A.operation) && A.operation.every(FV.string)) cD.block(A.operation, !1);
      else throw FV.invalidParameterError("operation", "Array<string>", A.operation);
    else throw FV.invalidParameterError("options", "object", A)
  }
  ez2.exports = function(A) {
    A.cache = tz2, A.concurrency = xG5, A.counters = vG5, A.simd = bG5, A.format = vO, A.interpolators = kG5, A.versions = Du, A.queue = fG5, A.block = gG5, A.unblock = hG5
  }
})
// @from(Start 7495409, End 7495576)
kK1 = z((_n8, Bw2) => {
  var T$ = Kz2();
  Pz2()(T$);
  xz2()(T$);
  vz2()(T$);
  hz2()(T$);
  uz2()(T$);
  cz2()(T$);
  rz2()(T$);
  Aw2()(T$);
  Bw2.exports = T$
})
// @from(Start 7495582, End 7496919)
l11 = z((tW5) => {
  function rW5(A, B, Q) {
    if (Q === void 0) Q = Array.prototype;
    if (A && typeof Q.find === "function") return Q.find.call(A, B);
    for (var I = 0; I < A.length; I++)
      if (Object.prototype.hasOwnProperty.call(A, I)) {
        var G = A[I];
        if (B.call(void 0, G, I, A)) return G
      }
  }

  function Pe1(A, B) {
    if (B === void 0) B = Object;
    return B && typeof B.freeze === "function" ? B.freeze(A) : A
  }

  function oW5(A, B) {
    if (A === null || typeof A !== "object") throw new TypeError("target is not an object");
    for (var Q in B)
      if (Object.prototype.hasOwnProperty.call(B, Q)) A[Q] = B[Q];
    return A
  }
  var jU2 = Pe1({
      HTML: "text/html",
      isHTML: function(A) {
        return A === jU2.HTML
      },
      XML_APPLICATION: "application/xml",
      XML_TEXT: "text/xml",
      XML_XHTML_APPLICATION: "application/xhtml+xml",
      XML_SVG_IMAGE: "image/svg+xml"
    }),
    yU2 = Pe1({
      HTML: "http://www.w3.org/1999/xhtml",
      isHTML: function(A) {
        return A === yU2.HTML
      },
      SVG: "http://www.w3.org/2000/svg",
      XML: "http://www.w3.org/XML/1998/namespace",
      XMLNS: "http://www.w3.org/2000/xmlns/"
    });
  tW5.assign = oW5;
  tW5.find = rW5;
  tW5.freeze = Pe1;
  tW5.MIME_TYPE = jU2;
  tW5.NAMESPACE = yU2
})
// @from(Start 7496925, End 7524928)
he1 = z((wJ5) => {
  var mU2 = l11(),
    CE = mU2.find,
    i11 = mU2.NAMESPACE;

  function GJ5(A) {
    return A !== ""
  }

  function ZJ5(A) {
    return A ? A.split(/[\t\n\f\r ]+/).filter(GJ5) : []
  }

  function DJ5(A, B) {
    if (!A.hasOwnProperty(B)) A[B] = !0;
    return A
  }

  function kU2(A) {
    if (!A) return [];
    var B = ZJ5(A);
    return Object.keys(B.reduce(DJ5, {}))
  }

  function YJ5(A) {
    return function(B) {
      return A && A.indexOf(B) !== -1
    }
  }

  function a11(A, B) {
    for (var Q in A)
      if (Object.prototype.hasOwnProperty.call(A, Q)) B[Q] = A[Q]
  }

  function CW(A, B) {
    var Q = A.prototype;
    if (!(Q instanceof B)) {
      let G = function() {};
      var I = G;
      G.prototype = B.prototype, G = new G, a11(Q, G), A.prototype = Q = G
    }
    if (Q.constructor != A) {
      if (typeof A != "function") console.error("unknown Class:" + A);
      Q.constructor = A
    }
  }
  var KW = {},
    mK = KW.ELEMENT_NODE = 1,
    qu = KW.ATTRIBUTE_NODE = 2,
    OH1 = KW.TEXT_NODE = 3,
    dU2 = KW.CDATA_SECTION_NODE = 4,
    uU2 = KW.ENTITY_REFERENCE_NODE = 5,
    WJ5 = KW.ENTITY_NODE = 6,
    pU2 = KW.PROCESSING_INSTRUCTION_NODE = 7,
    cU2 = KW.COMMENT_NODE = 8,
    lU2 = KW.DOCUMENT_NODE = 9,
    iU2 = KW.DOCUMENT_TYPE_NODE = 10,
    j$ = KW.DOCUMENT_FRAGMENT_NODE = 11,
    JJ5 = KW.NOTATION_NODE = 12,
    lZ = {},
    hI = {},
    H9B = lZ.INDEX_SIZE_ERR = (hI[1] = "Index size error", 1),
    z9B = lZ.DOMSTRING_SIZE_ERR = (hI[2] = "DOMString size error", 2),
    VW = lZ.HIERARCHY_REQUEST_ERR = (hI[3] = "Hierarchy request error", 3),
    w9B = lZ.WRONG_DOCUMENT_ERR = (hI[4] = "Wrong document", 4),
    E9B = lZ.INVALID_CHARACTER_ERR = (hI[5] = "Invalid character", 5),
    U9B = lZ.NO_DATA_ALLOWED_ERR = (hI[6] = "No data allowed", 6),
    N9B = lZ.NO_MODIFICATION_ALLOWED_ERR = (hI[7] = "No modification allowed", 7),
    nU2 = lZ.NOT_FOUND_ERR = (hI[8] = "Not found", 8),
    $9B = lZ.NOT_SUPPORTED_ERR = (hI[9] = "Not supported", 9),
    xU2 = lZ.INUSE_ATTRIBUTE_ERR = (hI[10] = "Attribute in use", 10),
    q9B = lZ.INVALID_STATE_ERR = (hI[11] = "Invalid state", 11),
    M9B = lZ.SYNTAX_ERR = (hI[12] = "Syntax error", 12),
    L9B = lZ.INVALID_MODIFICATION_ERR = (hI[13] = "Invalid modification", 13),
    R9B = lZ.NAMESPACE_ERR = (hI[14] = "Invalid namespace", 14),
    O9B = lZ.INVALID_ACCESS_ERR = (hI[15] = "Invalid access", 15);

  function hQ(A, B) {
    if (B instanceof Error) var Q = B;
    else if (Q = this, Error.call(this, hI[A]), this.message = hI[A], Error.captureStackTrace) Error.captureStackTrace(this, hQ);
    if (Q.code = A, B) this.message = this.message + ": " + B;
    return Q
  }
  hQ.prototype = Error.prototype;
  a11(lZ, hQ);

  function _$() {}
  _$.prototype = {
    length: 0,
    item: function(A) {
      return A >= 0 && A < this.length ? this[A] : null
    },
    toString: function(A, B) {
      for (var Q = [], I = 0; I < this.length; I++) $u(this[I], Q, A, B);
      return Q.join("")
    },
    filter: function(A) {
      return Array.prototype.filter.call(this, A)
    },
    indexOf: function(A) {
      return Array.prototype.indexOf.call(this, A)
    }
  };

  function Mu(A, B) {
    this._node = A, this._refresh = B, je1(this)
  }

  function je1(A) {
    var B = A._node._inc || A._node.ownerDocument._inc;
    if (A._inc !== B) {
      var Q = A._refresh(A._node);
      if (ZN2(A, "length", Q.length), !A.$$length || Q.length < A.$$length) {
        for (var I = Q.length; I in A; I++)
          if (Object.prototype.hasOwnProperty.call(A, I)) delete A[I]
      }
      a11(Q, A), A._inc = B
    }
  }
  Mu.prototype.item = function(A) {
    return je1(this), this[A] || null
  };
  CW(Mu, _$);

  function TH1() {}

  function aU2(A, B) {
    var Q = A.length;
    while (Q--)
      if (A[Q] === B) return Q
  }

  function fU2(A, B, Q, I) {
    if (I) B[aU2(B, I)] = Q;
    else B[B.length++] = Q;
    if (A) {
      Q.ownerElement = A;
      var G = A.ownerDocument;
      if (G) I && oU2(G, A, I), FJ5(G, A, Q)
    }
  }

  function vU2(A, B, Q) {
    var I = aU2(B, Q);
    if (I >= 0) {
      var G = B.length - 1;
      while (I < G) B[I] = B[++I];
      if (B.length = G, A) {
        var Z = A.ownerDocument;
        if (Z) oU2(Z, A, Q), Q.ownerElement = null
      }
    } else throw new hQ(nU2, new Error(A.tagName + "@" + Q))
  }
  TH1.prototype = {
    length: 0,
    item: _$.prototype.item,
    getNamedItem: function(A) {
      var B = this.length;
      while (B--) {
        var Q = this[B];
        if (Q.nodeName == A) return Q
      }
    },
    setNamedItem: function(A) {
      var B = A.ownerElement;
      if (B && B != this._ownerElement) throw new hQ(xU2);
      var Q = this.getNamedItem(A.nodeName);
      return fU2(this._ownerElement, this, A, Q), Q
    },
    setNamedItemNS: function(A) {
      var B = A.ownerElement,
        Q;
      if (B && B != this._ownerElement) throw new hQ(xU2);
      return Q = this.getNamedItemNS(A.namespaceURI, A.localName), fU2(this._ownerElement, this, A, Q), Q
    },
    removeNamedItem: function(A) {
      var B = this.getNamedItem(A);
      return vU2(this._ownerElement, this, B), B
    },
    removeNamedItemNS: function(A, B) {
      var Q = this.getNamedItemNS(A, B);
      return vU2(this._ownerElement, this, Q), Q
    },
    getNamedItemNS: function(A, B) {
      var Q = this.length;
      while (Q--) {
        var I = this[Q];
        if (I.localName == B && I.namespaceURI == A) return I
      }
      return null
    }
  };

  function sU2() {}
  sU2.prototype = {
    hasFeature: function(A, B) {
      return !0
    },
    createDocument: function(A, B, Q) {
      var I = new s11;
      if (I.implementation = this, I.childNodes = new _$, I.doctype = Q || null, Q) I.appendChild(Q);
      if (B) {
        var G = I.createElementNS(A, B);
        I.appendChild(G)
      }
      return I
    },
    createDocumentType: function(A, B, Q) {
      var I = new _H1;
      return I.name = A, I.nodeName = A, I.publicId = B || "", I.systemId = Q || "", I
    }
  };

  function V8() {}
  V8.prototype = {
    firstChild: null,
    lastChild: null,
    previousSibling: null,
    nextSibling: null,
    attributes: null,
    parentNode: null,
    childNodes: null,
    ownerDocument: null,
    nodeValue: null,
    namespaceURI: null,
    prefix: null,
    localName: null,
    insertBefore: function(A, B) {
      return PH1(this, A, B)
    },
    replaceChild: function(A, B) {
      if (PH1(this, A, B, eU2), B) this.removeChild(B)
    },
    removeChild: function(A) {
      return tU2(this, A)
    },
    appendChild: function(A) {
      return this.insertBefore(A, null)
    },
    hasChildNodes: function() {
      return this.firstChild != null
    },
    cloneNode: function(A) {
      return _e1(this.ownerDocument || this, this, A)
    },
    normalize: function() {
      var A = this.firstChild;
      while (A) {
        var B = A.nextSibling;
        if (B && B.nodeType == OH1 && A.nodeType == OH1) this.removeChild(B), A.appendData(B.data);
        else A.normalize(), A = B
      }
    },
    isSupported: function(A, B) {
      return this.ownerDocument.implementation.hasFeature(A, B)
    },
    hasAttributes: function() {
      return this.attributes.length > 0
    },
    lookupPrefix: function(A) {
      var B = this;
      while (B) {
        var Q = B._nsMap;
        if (Q) {
          for (var I in Q)
            if (Object.prototype.hasOwnProperty.call(Q, I) && Q[I] === A) return I
        }
        B = B.nodeType == qu ? B.ownerDocument : B.parentNode
      }
      return null
    },
    lookupNamespaceURI: function(A) {
      var B = this;
      while (B) {
        var Q = B._nsMap;
        if (Q) {
          if (Object.prototype.hasOwnProperty.call(Q, A)) return Q[A]
        }
        B = B.nodeType == qu ? B.ownerDocument : B.parentNode
      }
      return null
    },
    isDefaultNamespace: function(A) {
      var B = this.lookupPrefix(A);
      return B == null
    }
  };

  function rU2(A) {
    return A == "<" && "&lt;" || A == ">" && "&gt;" || A == "&" && "&amp;" || A == '"' && "&quot;" || "&#" + A.charCodeAt() + ";"
  }
  a11(KW, V8);
  a11(KW, V8.prototype);

  function n11(A, B) {
    if (B(A)) return !0;
    if (A = A.firstChild)
      do
        if (n11(A, B)) return !0; while (A = A.nextSibling)
  }

  function s11() {
    this.ownerDocument = this
  }

  function FJ5(A, B, Q) {
    A && A._inc++;
    var I = Q.namespaceURI;
    if (I === i11.XMLNS) B._nsMap[Q.prefix ? Q.localName : ""] = Q.value
  }

  function oU2(A, B, Q, I) {
    A && A._inc++;
    var G = Q.namespaceURI;
    if (G === i11.XMLNS) delete B._nsMap[Q.prefix ? Q.localName : ""]
  }

  function ye1(A, B, Q) {
    if (A && A._inc) {
      A._inc++;
      var I = B.childNodes;
      if (Q) I[I.length++] = Q;
      else {
        var G = B.firstChild,
          Z = 0;
        while (G) I[Z++] = G, G = G.nextSibling;
        I.length = Z, delete I[I.length]
      }
    }
  }

  function tU2(A, B) {
    var {
      previousSibling: Q,
      nextSibling: I
    } = B;
    if (Q) Q.nextSibling = I;
    else A.firstChild = I;
    if (I) I.previousSibling = Q;
    else A.lastChild = Q;
    return B.parentNode = null, B.previousSibling = null, B.nextSibling = null, ye1(A.ownerDocument, A), B
  }

  function XJ5(A) {
    return A && (A.nodeType === V8.DOCUMENT_NODE || A.nodeType === V8.DOCUMENT_FRAGMENT_NODE || A.nodeType === V8.ELEMENT_NODE)
  }

  function VJ5(A) {
    return A && (KE(A) || ke1(A) || y$(A) || A.nodeType === V8.DOCUMENT_FRAGMENT_NODE || A.nodeType === V8.COMMENT_NODE || A.nodeType === V8.PROCESSING_INSTRUCTION_NODE)
  }

  function y$(A) {
    return A && A.nodeType === V8.DOCUMENT_TYPE_NODE
  }

  function KE(A) {
    return A && A.nodeType === V8.ELEMENT_NODE
  }

  function ke1(A) {
    return A && A.nodeType === V8.TEXT_NODE
  }

  function bU2(A, B) {
    var Q = A.childNodes || [];
    if (CE(Q, KE) || y$(B)) return !1;
    var I = CE(Q, y$);
    return !(B && I && Q.indexOf(I) > Q.indexOf(B))
  }

  function gU2(A, B) {
    var Q = A.childNodes || [];

    function I(Z) {
      return KE(Z) && Z !== B
    }
    if (CE(Q, I)) return !1;
    var G = CE(Q, y$);
    return !(B && G && Q.indexOf(G) > Q.indexOf(B))
  }

  function CJ5(A, B, Q) {
    if (!XJ5(A)) throw new hQ(VW, "Unexpected parent node type " + A.nodeType);
    if (Q && Q.parentNode !== A) throw new hQ(nU2, "child not in parent");
    if (!VJ5(B) || y$(B) && A.nodeType !== V8.DOCUMENT_NODE) throw new hQ(VW, "Unexpected node type " + B.nodeType + " for parent node type " + A.nodeType)
  }

  function KJ5(A, B, Q) {
    var I = A.childNodes || [],
      G = B.childNodes || [];
    if (B.nodeType === V8.DOCUMENT_FRAGMENT_NODE) {
      var Z = G.filter(KE);
      if (Z.length > 1 || CE(G, ke1)) throw new hQ(VW, "More than one element or text in fragment");
      if (Z.length === 1 && !bU2(A, Q)) throw new hQ(VW, "Element in fragment can not be inserted before doctype")
    }
    if (KE(B)) {
      if (!bU2(A, Q)) throw new hQ(VW, "Only one element can be added and only after doctype")
    }
    if (y$(B)) {
      if (CE(I, y$)) throw new hQ(VW, "Only one doctype is allowed");
      var D = CE(I, KE);
      if (Q && I.indexOf(D) < I.indexOf(Q)) throw new hQ(VW, "Doctype can only be inserted before an element");
      if (!Q && D) throw new hQ(VW, "Doctype can not be appended since element is present")
    }
  }

  function eU2(A, B, Q) {
    var I = A.childNodes || [],
      G = B.childNodes || [];
    if (B.nodeType === V8.DOCUMENT_FRAGMENT_NODE) {
      var Z = G.filter(KE);
      if (Z.length > 1 || CE(G, ke1)) throw new hQ(VW, "More than one element or text in fragment");
      if (Z.length === 1 && !gU2(A, Q)) throw new hQ(VW, "Element in fragment can not be inserted before doctype")
    }
    if (KE(B)) {
      if (!gU2(A, Q)) throw new hQ(VW, "Only one element can be added and only after doctype")
    }
    if (y$(B)) {
      let W = function(J) {
        return y$(J) && J !== Q
      };
      var Y = W;
      if (CE(I, W)) throw new hQ(VW, "Only one doctype is allowed");
      var D = CE(I, KE);
      if (Q && I.indexOf(D) < I.indexOf(Q)) throw new hQ(VW, "Doctype can only be inserted before an element")
    }
  }

  function PH1(A, B, Q, I) {
    if (CJ5(A, B, Q), A.nodeType === V8.DOCUMENT_NODE)(I || KJ5)(A, B, Q);
    var G = B.parentNode;
    if (G) G.removeChild(B);
    if (B.nodeType === j$) {
      var Z = B.firstChild;
      if (Z == null) return B;
      var D = B.lastChild
    } else Z = D = B;
    var Y = Q ? Q.previousSibling : A.lastChild;
    if (Z.previousSibling = Y, D.nextSibling = Q, Y) Y.nextSibling = Z;
    else A.firstChild = Z;
    if (Q == null) A.lastChild = D;
    else Q.previousSibling = D;
    do Z.parentNode = A; while (Z !== D && (Z = Z.nextSibling));
    if (ye1(A.ownerDocument || A, A), B.nodeType == j$) B.firstChild = B.lastChild = null;
    return B
  }

  function HJ5(A, B) {
    if (B.parentNode) B.parentNode.removeChild(B);
    if (B.parentNode = A, B.previousSibling = A.lastChild, B.nextSibling = null, B.previousSibling) B.previousSibling.nextSibling = B;
    else A.firstChild = B;
    return A.lastChild = B, ye1(A.ownerDocument, A, B), B
  }
  s11.prototype = {
    nodeName: "#document",
    nodeType: lU2,
    doctype: null,
    documentElement: null,
    _inc: 1,
    insertBefore: function(A, B) {
      if (A.nodeType == j$) {
        var Q = A.firstChild;
        while (Q) {
          var I = Q.nextSibling;
          this.insertBefore(Q, B), Q = I
        }
        return A
      }
      if (PH1(this, A, B), A.ownerDocument = this, this.documentElement === null && A.nodeType === mK) this.documentElement = A;
      return A
    },
    removeChild: function(A) {
      if (this.documentElement == A) this.documentElement = null;
      return tU2(this, A)
    },
    replaceChild: function(A, B) {
      if (PH1(this, A, B, eU2), A.ownerDocument = this, B) this.removeChild(B);
      if (KE(A)) this.documentElement = A
    },
    importNode: function(A, B) {
      return GN2(this, A, B)
    },
    getElementById: function(A) {
      var B = null;
      return n11(this.documentElement, function(Q) {
        if (Q.nodeType == mK) {
          if (Q.getAttribute("id") == A) return B = Q, !0
        }
      }), B
    },
    getElementsByClassName: function(A) {
      var B = kU2(A);
      return new Mu(this, function(Q) {
        var I = [];
        if (B.length > 0) n11(Q.documentElement, function(G) {
          if (G !== Q && G.nodeType === mK) {
            var Z = G.getAttribute("class");
            if (Z) {
              var D = A === Z;
              if (!D) {
                var Y = kU2(Z);
                D = B.every(YJ5(Y))
              }
              if (D) I.push(G)
            }
          }
        });
        return I
      })
    },
    createElement: function(A) {
      var B = new Ey;
      B.ownerDocument = this, B.nodeName = A, B.tagName = A, B.localName = A, B.childNodes = new _$;
      var Q = B.attributes = new TH1;
      return Q._ownerElement = B, B
    },
    createDocumentFragment: function() {
      var A = new jH1;
      return A.ownerDocument = this, A.childNodes = new _$, A
    },
    createTextNode: function(A) {
      var B = new xe1;
      return B.ownerDocument = this, B.appendData(A), B
    },
    createComment: function(A) {
      var B = new fe1;
      return B.ownerDocument = this, B.appendData(A), B
    },
    createCDATASection: function(A) {
      var B = new ve1;
      return B.ownerDocument = this, B.appendData(A), B
    },
    createProcessingInstruction: function(A, B) {
      var Q = new ge1;
      return Q.ownerDocument = this, Q.tagName = Q.nodeName = Q.target = A, Q.nodeValue = Q.data = B, Q
    },
    createAttribute: function(A) {
      var B = new SH1;
      return B.ownerDocument = this, B.name = A, B.nodeName = A, B.localName = A, B.specified = !0, B
    },
    createEntityReference: function(A) {
      var B = new be1;
      return B.ownerDocument = this, B.nodeName = A, B
    },
    createElementNS: function(A, B) {
      var Q = new Ey,
        I = B.split(":"),
        G = Q.attributes = new TH1;
      if (Q.childNodes = new _$, Q.ownerDocument = this, Q.nodeName = B, Q.tagName = B, Q.namespaceURI = A, I.length == 2) Q.prefix = I[0], Q.localName = I[1];
      else Q.localName = B;
      return G._ownerElement = Q, Q
    },
    createAttributeNS: function(A, B) {
      var Q = new SH1,
        I = B.split(":");
      if (Q.ownerDocument = this, Q.nodeName = B, Q.name = B, Q.namespaceURI = A, Q.specified = !0, I.length == 2) Q.prefix = I[0], Q.localName = I[1];
      else Q.localName = B;
      return Q
    }
  };
  CW(s11, V8);

  function Ey() {
    this._nsMap = {}
  }
  Ey.prototype = {
    nodeType: mK,
    hasAttribute: function(A) {
      return this.getAttributeNode(A) != null
    },
    getAttribute: function(A) {
      var B = this.getAttributeNode(A);
      return B && B.value || ""
    },
    getAttributeNode: function(A) {
      return this.attributes.getNamedItem(A)
    },
    setAttribute: function(A, B) {
      var Q = this.ownerDocument.createAttribute(A);
      Q.value = Q.nodeValue = "" + B, this.setAttributeNode(Q)
    },
    removeAttribute: function(A) {
      var B = this.getAttributeNode(A);
      B && this.removeAttributeNode(B)
    },
    appendChild: function(A) {
      if (A.nodeType === j$) return this.insertBefore(A, null);
      else return HJ5(this, A)
    },
    setAttributeNode: function(A) {
      return this.attributes.setNamedItem(A)
    },
    setAttributeNodeNS: function(A) {
      return this.attributes.setNamedItemNS(A)
    },
    removeAttributeNode: function(A) {
      return this.attributes.removeNamedItem(A.nodeName)
    },
    removeAttributeNS: function(A, B) {
      var Q = this.getAttributeNodeNS(A, B);
      Q && this.removeAttributeNode(Q)
    },
    hasAttributeNS: function(A, B) {
      return this.getAttributeNodeNS(A, B) != null
    },
    getAttributeNS: function(A, B) {
      var Q = this.getAttributeNodeNS(A, B);
      return Q && Q.value || ""
    },
    setAttributeNS: function(A, B, Q) {
      var I = this.ownerDocument.createAttributeNS(A, B);
      I.value = I.nodeValue = "" + Q, this.setAttributeNode(I)
    },
    getAttributeNodeNS: function(A, B) {
      return this.attributes.getNamedItemNS(A, B)
    },
    getElementsByTagName: function(A) {
      return new Mu(this, function(B) {
        var Q = [];
        return n11(B, function(I) {
          if (I !== B && I.nodeType == mK && (A === "*" || I.tagName == A)) Q.push(I)
        }), Q
      })
    },
    getElementsByTagNameNS: function(A, B) {
      return new Mu(this, function(Q) {
        var I = [];
        return n11(Q, function(G) {
          if (G !== Q && G.nodeType === mK && (A === "*" || G.namespaceURI === A) && (B === "*" || G.localName == B)) I.push(G)
        }), I
      })
    }
  };
  s11.prototype.getElementsByTagName = Ey.prototype.getElementsByTagName;
  s11.prototype.getElementsByTagNameNS = Ey.prototype.getElementsByTagNameNS;
  CW(Ey, V8);

  function SH1() {}
  SH1.prototype.nodeType = qu;
  CW(SH1, V8);

  function r11() {}
  r11.prototype = {
    data: "",
    substringData: function(A, B) {
      return this.data.substring(A, A + B)
    },
    appendData: function(A) {
      A = this.data + A, this.nodeValue = this.data = A, this.length = A.length
    },
    insertData: function(A, B) {
      this.replaceData(A, 0, B)
    },
    appendChild: function(A) {
      throw new Error(hI[VW])
    },
    deleteData: function(A, B) {
      this.replaceData(A, B, "")
    },
    replaceData: function(A, B, Q) {
      var I = this.data.substring(0, A),
        G = this.data.substring(A + B);
      Q = I + Q + G, this.nodeValue = this.data = Q, this.length = Q.length
    }
  };
  CW(r11, V8);

  function xe1() {}
  xe1.prototype = {
    nodeName: "#text",
    nodeType: OH1,
    splitText: function(A) {
      var B = this.data,
        Q = B.substring(A);
      B = B.substring(0, A), this.data = this.nodeValue = B, this.length = B.length;
      var I = this.ownerDocument.createTextNode(Q);
      if (this.parentNode) this.parentNode.insertBefore(I, this.nextSibling);
      return I
    }
  };
  CW(xe1, r11);

  function fe1() {}
  fe1.prototype = {
    nodeName: "#comment",
    nodeType: cU2
  };
  CW(fe1, r11);

  function ve1() {}
  ve1.prototype = {
    nodeName: "#cdata-section",
    nodeType: dU2
  };
  CW(ve1, r11);

  function _H1() {}
  _H1.prototype.nodeType = iU2;
  CW(_H1, V8);

  function AN2() {}
  AN2.prototype.nodeType = JJ5;
  CW(AN2, V8);

  function BN2() {}
  BN2.prototype.nodeType = WJ5;
  CW(BN2, V8);

  function be1() {}
  be1.prototype.nodeType = uU2;
  CW(be1, V8);

  function jH1() {}
  jH1.prototype.nodeName = "#document-fragment";
  jH1.prototype.nodeType = j$;
  CW(jH1, V8);

  function ge1() {}
  ge1.prototype.nodeType = pU2;
  CW(ge1, V8);

  function QN2() {}
  QN2.prototype.serializeToString = function(A, B, Q) {
    return IN2.call(A, B, Q)
  };
  V8.prototype.toString = IN2;

  function IN2(A, B) {
    var Q = [],
      I = this.nodeType == 9 && this.documentElement || this,
      G = I.prefix,
      Z = I.namespaceURI;
    if (Z && G == null) {
      var G = I.lookupPrefix(Z);
      if (G == null) var D = [{
        namespace: Z,
        prefix: null
      }]
    }
    return $u(this, Q, A, B, D), Q.join("")
  }

  function hU2(A, B, Q) {
    var I = A.prefix || "",
      G = A.namespaceURI;
    if (!G) return !1;
    if (I === "xml" && G === i11.XML || G === i11.XMLNS) return !1;
    var Z = Q.length;
    while (Z--) {
      var D = Q[Z];
      if (D.prefix === I) return D.namespace !== G
    }
    return !0
  }

  function Se1(A, B, Q) {
    A.push(" ", B, '="', Q.replace(/[<>&"\t\n\r]/g, rU2), '"')
  }

  function $u(A, B, Q, I, G) {
    if (!G) G = [];
    if (I)
      if (A = I(A), A) {
        if (typeof A == "string") {
          B.push(A);
          return
        }
      } else return;
    switch (A.nodeType) {
      case mK:
        var Z = A.attributes,
          D = Z.length,
          q = A.firstChild,
          Y = A.tagName;
        Q = i11.isHTML(A.namespaceURI) || Q;
        var W = Y;
        if (!Q && !A.prefix && A.namespaceURI) {
          var J;
          for (var F = 0; F < Z.length; F++)
            if (Z.item(F).name === "xmlns") {
              J = Z.item(F).value;
              break
            } if (!J)
            for (var X = G.length - 1; X >= 0; X--) {
              var V = G[X];
              if (V.prefix === "" && V.namespace === A.namespaceURI) {
                J = V.namespace;
                break
              }
            }
          if (J !== A.namespaceURI)
            for (var X = G.length - 1; X >= 0; X--) {
              var V = G[X];
              if (V.namespace === A.namespaceURI) {
                if (V.prefix) W = V.prefix + ":" + Y;
                break
              }
            }
        }
        B.push("<", W);
        for (var C = 0; C < D; C++) {
          var K = Z.item(C);
          if (K.prefix == "xmlns") G.push({
            prefix: K.localName,
            namespace: K.value
          });
          else if (K.nodeName == "xmlns") G.push({
            prefix: "",
            namespace: K.value
          })
        }
        for (var C = 0; C < D; C++) {
          var K = Z.item(C);
          if (hU2(K, Q, G)) {
            var E = K.prefix || "",
              N = K.namespaceURI;
            Se1(B, E ? "xmlns:" + E : "xmlns", N), G.push({
              prefix: E,
              namespace: N
            })
          }
          $u(K, B, Q, I, G)
        }
        if (Y === W && hU2(A, Q, G)) {
          var E = A.prefix || "",
            N = A.namespaceURI;
          Se1(B, E ? "xmlns:" + E : "xmlns", N), G.push({
            prefix: E,
            namespace: N
          })
        }
        if (q || Q && !/^(?:meta|link|img|br|hr|input)$/i.test(Y)) {
          if (B.push(">"), Q && /^script$/i.test(Y))
            while (q) {
              if (q.data) B.push(q.data);
              else $u(q, B, Q, I, G.slice());
              q = q.nextSibling
            } else
              while (q) $u(q, B, Q, I, G.slice()), q = q.nextSibling;
          B.push("</", W, ">")
        } else B.push("/>");
        return;
      case lU2:
      case j$:
        var q = A.firstChild;
        while (q) $u(q, B, Q, I, G.slice()), q = q.nextSibling;
        return;
      case qu:
        return Se1(B, A.name, A.value);
      case OH1:
        return B.push(A.data.replace(/[<&>]/g, rU2));
      case dU2:
        return B.push("<![CDATA[", A.data, "]]>");
      case cU2:
        return B.push("<!--", A.data, "-->");
      case iU2:
        var {
          publicId: O, systemId: R
        } = A;
        if (B.push("<!DOCTYPE ", A.name), O) {
          if (B.push(" PUBLIC ", O), R && R != ".") B.push(" ", R);
          B.push(">")
        } else if (R && R != ".") B.push(" SYSTEM ", R, ">");
        else {
          var T = A.internalSubset;
          if (T) B.push(" [", T, "]");
          B.push(">")
        }
        return;
      case pU2:
        return B.push("<?", A.target, " ", A.data, "?>");
      case uU2:
        return B.push("&", A.nodeName, ";");
      default:
        B.push("??", A.nodeName)
    }
  }

  function GN2(A, B, Q) {
    var I;
    switch (B.nodeType) {
      case mK:
        I = B.cloneNode(!1), I.ownerDocument = A;
      case j$:
        break;
      case qu:
        Q = !0;
        break
    }
    if (!I) I = B.cloneNode(!1);
    if (I.ownerDocument = A, I.parentNode = null, Q) {
      var G = B.firstChild;
      while (G) I.appendChild(GN2(A, G, Q)), G = G.nextSibling
    }
    return I
  }

  function _e1(A, B, Q) {
    var I = new B.constructor;
    for (var G in B)
      if (Object.prototype.hasOwnProperty.call(B, G)) {
        var Z = B[G];
        if (typeof Z != "object") {
          if (Z != I[G]) I[G] = Z
        }
      } if (B.childNodes) I.childNodes = new _$;
    switch (I.ownerDocument = A, I.nodeType) {
      case mK:
        var D = B.attributes,
          Y = I.attributes = new TH1,
          W = D.length;
        Y._ownerElement = I;
        for (var J = 0; J < W; J++) I.setAttributeNode(_e1(A, D.item(J), !0));
        break;
      case qu:
        Q = !0
    }
    if (Q) {
      var F = B.firstChild;
      while (F) I.appendChild(_e1(A, F, Q)), F = F.nextSibling
    }
    return I
  }

  function ZN2(A, B, Q) {
    A[B] = Q
  }
  try {
    if (Object.defineProperty) {
      let A = function(B) {
        switch (B.nodeType) {
          case mK:
          case j$:
            var Q = [];
            B = B.firstChild;
            while (B) {
              if (B.nodeType !== 7 && B.nodeType !== 8) Q.push(A(B));
              B = B.nextSibling
            }
            return Q.join("");
          default:
            return B.nodeValue
        }
      };
      zJ5 = A, Object.defineProperty(Mu.prototype, "length", {
        get: function() {
          return je1(this), this.$$length
        }
      }), Object.defineProperty(V8.prototype, "textContent", {
        get: function() {
          return A(this)
        },
        set: function(B) {
          switch (this.nodeType) {
            case mK:
            case j$:
              while (this.firstChild) this.removeChild(this.firstChild);
              if (B || String(B)) this.appendChild(this.ownerDocument.createTextNode(B));
              break;
            default:
              this.data = B, this.value = B, this.nodeValue = B
          }
        }
      }), ZN2 = function(B, Q, I) {
        B["$$" + Q] = I
      }
    }
  } catch (A) {}
  var zJ5;
  wJ5.DocumentType = _H1;
  wJ5.DOMException = hQ;
  wJ5.DOMImplementation = sU2;
  wJ5.Element = Ey;
  wJ5.Node = V8;
  wJ5.NodeList = _$;
  wJ5.XMLSerializer = QN2
})
// @from(Start 7524934, End 7564089)
WN2 = z((RJ5) => {
  var DN2 = l11().freeze;
  RJ5.XML_ENTITIES = DN2({
    amp: "&",
    apos: "'",
    gt: ">",
    lt: "<",
    quot: '"'
  });
  RJ5.HTML_ENTITIES = DN2({
    Aacute: "Á",
    aacute: "á",
    Abreve: "Ă",
    abreve: "ă",
    ac: "∾",
    acd: "∿",
    acE: "∾̳",
    Acirc: "Â",
    acirc: "â",
    acute: "´",
    Acy: "А",
    acy: "а",
    AElig: "Æ",
    aelig: "æ",
    af: "⁡",
    Afr: "\uD835\uDD04",
    afr: "\uD835\uDD1E",
    Agrave: "À",
    agrave: "à",
    alefsym: "ℵ",
    aleph: "ℵ",
    Alpha: "Α",
    alpha: "α",
    Amacr: "Ā",
    amacr: "ā",
    amalg: "⨿",
    AMP: "&",
    amp: "&",
    And: "⩓",
    and: "∧",
    andand: "⩕",
    andd: "⩜",
    andslope: "⩘",
    andv: "⩚",
    ang: "∠",
    ange: "⦤",
    angle: "∠",
    angmsd: "∡",
    angmsdaa: "⦨",
    angmsdab: "⦩",
    angmsdac: "⦪",
    angmsdad: "⦫",
    angmsdae: "⦬",
    angmsdaf: "⦭",
    angmsdag: "⦮",
    angmsdah: "⦯",
    angrt: "∟",
    angrtvb: "⊾",
    angrtvbd: "⦝",
    angsph: "∢",
    angst: "Å",
    angzarr: "⍼",
    Aogon: "Ą",
    aogon: "ą",
    Aopf: "\uD835\uDD38",
    aopf: "\uD835\uDD52",
    ap: "≈",
    apacir: "⩯",
    apE: "⩰",
    ape: "≊",
    apid: "≋",
    apos: "'",
    ApplyFunction: "⁡",
    approx: "≈",
    approxeq: "≊",
    Aring: "Å",
    aring: "å",
    Ascr: "\uD835\uDC9C",
    ascr: "\uD835\uDCB6",
    Assign: "≔",
    ast: "*",
    asymp: "≈",
    asympeq: "≍",
    Atilde: "Ã",
    atilde: "ã",
    Auml: "Ä",
    auml: "ä",
    awconint: "∳",
    awint: "⨑",
    backcong: "≌",
    backepsilon: "϶",
    backprime: "‵",
    backsim: "∽",
    backsimeq: "⋍",
    Backslash: "∖",
    Barv: "⫧",
    barvee: "⊽",
    Barwed: "⌆",
    barwed: "⌅",
    barwedge: "⌅",
    bbrk: "⎵",
    bbrktbrk: "⎶",
    bcong: "≌",
    Bcy: "Б",
    bcy: "б",
    bdquo: "„",
    becaus: "∵",
    Because: "∵",
    because: "∵",
    bemptyv: "⦰",
    bepsi: "϶",
    bernou: "ℬ",
    Bernoullis: "ℬ",
    Beta: "Β",
    beta: "β",
    beth: "ℶ",
    between: "≬",
    Bfr: "\uD835\uDD05",
    bfr: "\uD835\uDD1F",
    bigcap: "⋂",
    bigcirc: "◯",
    bigcup: "⋃",
    bigodot: "⨀",
    bigoplus: "⨁",
    bigotimes: "⨂",
    bigsqcup: "⨆",
    bigstar: "★",
    bigtriangledown: "▽",
    bigtriangleup: "△",
    biguplus: "⨄",
    bigvee: "⋁",
    bigwedge: "⋀",
    bkarow: "⤍",
    blacklozenge: "⧫",
    blacksquare: "▪",
    blacktriangle: "▴",
    blacktriangledown: "▾",
    blacktriangleleft: "◂",
    blacktriangleright: "▸",
    blank: "␣",
    blk12: "▒",
    blk14: "░",
    blk34: "▓",
    block: "█",
    bne: "=⃥",
    bnequiv: "≡⃥",
    bNot: "⫭",
    bnot: "⌐",
    Bopf: "\uD835\uDD39",
    bopf: "\uD835\uDD53",
    bot: "⊥",
    bottom: "⊥",
    bowtie: "⋈",
    boxbox: "⧉",
    boxDL: "╗",
    boxDl: "╖",
    boxdL: "╕",
    boxdl: "┐",
    boxDR: "╔",
    boxDr: "╓",
    boxdR: "╒",
    boxdr: "┌",
    boxH: "═",
    boxh: "─",
    boxHD: "╦",
    boxHd: "╤",
    boxhD: "╥",
    boxhd: "┬",
    boxHU: "╩",
    boxHu: "╧",
    boxhU: "╨",
    boxhu: "┴",
    boxminus: "⊟",
    boxplus: "⊞",
    boxtimes: "⊠",
    boxUL: "╝",
    boxUl: "╜",
    boxuL: "╛",
    boxul: "┘",
    boxUR: "╚",
    boxUr: "╙",
    boxuR: "╘",
    boxur: "└",
    boxV: "║",
    boxv: "│",
    boxVH: "╬",
    boxVh: "╫",
    boxvH: "╪",
    boxvh: "┼",
    boxVL: "╣",
    boxVl: "╢",
    boxvL: "╡",
    boxvl: "┤",
    boxVR: "╠",
    boxVr: "╟",
    boxvR: "╞",
    boxvr: "├",
    bprime: "‵",
    Breve: "˘",
    breve: "˘",
    brvbar: "¦",
    Bscr: "ℬ",
    bscr: "\uD835\uDCB7",
    bsemi: "⁏",
    bsim: "∽",
    bsime: "⋍",
    bsol: "\\",
    bsolb: "⧅",
    bsolhsub: "⟈",
    bull: "•",
    bullet: "•",
    bump: "≎",
    bumpE: "⪮",
    bumpe: "≏",
    Bumpeq: "≎",
    bumpeq: "≏",
    Cacute: "Ć",
    cacute: "ć",
    Cap: "⋒",
    cap: "∩",
    capand: "⩄",
    capbrcup: "⩉",
    capcap: "⩋",
    capcup: "⩇",
    capdot: "⩀",
    CapitalDifferentialD: "ⅅ",
    caps: "∩︀",
    caret: "⁁",
    caron: "ˇ",
    Cayleys: "ℭ",
    ccaps: "⩍",
    Ccaron: "Č",
    ccaron: "č",
    Ccedil: "Ç",
    ccedil: "ç",
    Ccirc: "Ĉ",
    ccirc: "ĉ",
    Cconint: "∰",
    ccups: "⩌",
    ccupssm: "⩐",
    Cdot: "Ċ",
    cdot: "ċ",
    cedil: "¸",
    Cedilla: "¸",
    cemptyv: "⦲",
    cent: "¢",
    CenterDot: "·",
    centerdot: "·",
    Cfr: "ℭ",
    cfr: "\uD835\uDD20",
    CHcy: "Ч",
    chcy: "ч",
    check: "✓",
    checkmark: "✓",
    Chi: "Χ",
    chi: "χ",
    cir: "○",
    circ: "ˆ",
    circeq: "≗",
    circlearrowleft: "↺",
    circlearrowright: "↻",
    circledast: "⊛",
    circledcirc: "⊚",
    circleddash: "⊝",
    CircleDot: "⊙",
    circledR: "®",
    circledS: "Ⓢ",
    CircleMinus: "⊖",
    CirclePlus: "⊕",
    CircleTimes: "⊗",
    cirE: "⧃",
    cire: "≗",
    cirfnint: "⨐",
    cirmid: "⫯",
    cirscir: "⧂",
    ClockwiseContourIntegral: "∲",
    CloseCurlyDoubleQuote: "”",
    CloseCurlyQuote: "’",
    clubs: "♣",
    clubsuit: "♣",
    Colon: "∷",
    colon: ":",
    Colone: "⩴",
    colone: "≔",
    coloneq: "≔",
    comma: ",",
    commat: "@",
    comp: "∁",
    compfn: "∘",
    complement: "∁",
    complexes: "ℂ",
    cong: "≅",
    congdot: "⩭",
    Congruent: "≡",
    Conint: "∯",
    conint: "∮",
    ContourIntegral: "∮",
    Copf: "ℂ",
    copf: "\uD835\uDD54",
    coprod: "∐",
    Coproduct: "∐",
    COPY: "©",
    copy: "©",
    copysr: "℗",
    CounterClockwiseContourIntegral: "∳",
    crarr: "↵",
    Cross: "⨯",
    cross: "✗",
    Cscr: "\uD835\uDC9E",
    cscr: "\uD835\uDCB8",
    csub: "⫏",
    csube: "⫑",
    csup: "⫐",
    csupe: "⫒",
    ctdot: "⋯",
    cudarrl: "⤸",
    cudarrr: "⤵",
    cuepr: "⋞",
    cuesc: "⋟",
    cularr: "↶",
    cularrp: "⤽",
    Cup: "⋓",
    cup: "∪",
    cupbrcap: "⩈",
    CupCap: "≍",
    cupcap: "⩆",
    cupcup: "⩊",
    cupdot: "⊍",
    cupor: "⩅",
    cups: "∪︀",
    curarr: "↷",
    curarrm: "⤼",
    curlyeqprec: "⋞",
    curlyeqsucc: "⋟",
    curlyvee: "⋎",
    curlywedge: "⋏",
    curren: "¤",
    curvearrowleft: "↶",
    curvearrowright: "↷",
    cuvee: "⋎",
    cuwed: "⋏",
    cwconint: "∲",
    cwint: "∱",
    cylcty: "⌭",
    Dagger: "‡",
    dagger: "†",
    daleth: "ℸ",
    Darr: "↡",
    dArr: "⇓",
    darr: "↓",
    dash: "‐",
    Dashv: "⫤",
    dashv: "⊣",
    dbkarow: "⤏",
    dblac: "˝",
    Dcaron: "Ď",
    dcaron: "ď",
    Dcy: "Д",
    dcy: "д",
    DD: "ⅅ",
    dd: "ⅆ",
    ddagger: "‡",
    ddarr: "⇊",
    DDotrahd: "⤑",
    ddotseq: "⩷",
    deg: "°",
    Del: "∇",
    Delta: "Δ",
    delta: "δ",
    demptyv: "⦱",
    dfisht: "⥿",
    Dfr: "\uD835\uDD07",
    dfr: "\uD835\uDD21",
    dHar: "⥥",
    dharl: "⇃",
    dharr: "⇂",
    DiacriticalAcute: "´",
    DiacriticalDot: "˙",
    DiacriticalDoubleAcute: "˝",
    DiacriticalGrave: "`",
    DiacriticalTilde: "˜",
    diam: "⋄",
    Diamond: "⋄",
    diamond: "⋄",
    diamondsuit: "♦",
    diams: "♦",
    die: "¨",
    DifferentialD: "ⅆ",
    digamma: "ϝ",
    disin: "⋲",
    div: "÷",
    divide: "÷",
    divideontimes: "⋇",
    divonx: "⋇",
    DJcy: "Ђ",
    djcy: "ђ",
    dlcorn: "⌞",
    dlcrop: "⌍",
    dollar: "$",
    Dopf: "\uD835\uDD3B",
    dopf: "\uD835\uDD55",
    Dot: "¨",
    dot: "˙",
    DotDot: "⃜",
    doteq: "≐",
    doteqdot: "≑",
    DotEqual: "≐",
    dotminus: "∸",
    dotplus: "∔",
    dotsquare: "⊡",
    doublebarwedge: "⌆",
    DoubleContourIntegral: "∯",
    DoubleDot: "¨",
    DoubleDownArrow: "⇓",
    DoubleLeftArrow: "⇐",
    DoubleLeftRightArrow: "⇔",
    DoubleLeftTee: "⫤",
    DoubleLongLeftArrow: "⟸",
    DoubleLongLeftRightArrow: "⟺",
    DoubleLongRightArrow: "⟹",
    DoubleRightArrow: "⇒",
    DoubleRightTee: "⊨",
    DoubleUpArrow: "⇑",
    DoubleUpDownArrow: "⇕",
    DoubleVerticalBar: "∥",
    DownArrow: "↓",
    Downarrow: "⇓",
    downarrow: "↓",
    DownArrowBar: "⤓",
    DownArrowUpArrow: "⇵",
    DownBreve: "̑",
    downdownarrows: "⇊",
    downharpoonleft: "⇃",
    downharpoonright: "⇂",
    DownLeftRightVector: "⥐",
    DownLeftTeeVector: "⥞",
    DownLeftVector: "↽",
    DownLeftVectorBar: "⥖",
    DownRightTeeVector: "⥟",
    DownRightVector: "⇁",
    DownRightVectorBar: "⥗",
    DownTee: "⊤",
    DownTeeArrow: "↧",
    drbkarow: "⤐",
    drcorn: "⌟",
    drcrop: "⌌",
    Dscr: "\uD835\uDC9F",
    dscr: "\uD835\uDCB9",
    DScy: "Ѕ",
    dscy: "ѕ",
    dsol: "⧶",
    Dstrok: "Đ",
    dstrok: "đ",
    dtdot: "⋱",
    dtri: "▿",
    dtrif: "▾",
    duarr: "⇵",
    duhar: "⥯",
    dwangle: "⦦",
    DZcy: "Џ",
    dzcy: "џ",
    dzigrarr: "⟿",
    Eacute: "É",
    eacute: "é",
    easter: "⩮",
    Ecaron: "Ě",
    ecaron: "ě",
    ecir: "≖",
    Ecirc: "Ê",
    ecirc: "ê",
    ecolon: "≕",
    Ecy: "Э",
    ecy: "э",
    eDDot: "⩷",
    Edot: "Ė",
    eDot: "≑",
    edot: "ė",
    ee: "ⅇ",
    efDot: "≒",
    Efr: "\uD835\uDD08",
    efr: "\uD835\uDD22",
    eg: "⪚",
    Egrave: "È",
    egrave: "è",
    egs: "⪖",
    egsdot: "⪘",
    el: "⪙",
    Element: "∈",
    elinters: "⏧",
    ell: "ℓ",
    els: "⪕",
    elsdot: "⪗",
    Emacr: "Ē",
    emacr: "ē",
    empty: "∅",
    emptyset: "∅",
    EmptySmallSquare: "◻",
    emptyv: "∅",
    EmptyVerySmallSquare: "▫",
    emsp: " ",
    emsp13: " ",
    emsp14: " ",
    ENG: "Ŋ",
    eng: "ŋ",
    ensp: " ",
    Eogon: "Ę",
    eogon: "ę",
    Eopf: "\uD835\uDD3C",
    eopf: "\uD835\uDD56",
    epar: "⋕",
    eparsl: "⧣",
    eplus: "⩱",
    epsi: "ε",
    Epsilon: "Ε",
    epsilon: "ε",
    epsiv: "ϵ",
    eqcirc: "≖",
    eqcolon: "≕",
    eqsim: "≂",
    eqslantgtr: "⪖",
    eqslantless: "⪕",
    Equal: "⩵",
    equals: "=",
    EqualTilde: "≂",
    equest: "≟",
    Equilibrium: "⇌",
    equiv: "≡",
    equivDD: "⩸",
    eqvparsl: "⧥",
    erarr: "⥱",
    erDot: "≓",
    Escr: "ℰ",
    escr: "ℯ",
    esdot: "≐",
    Esim: "⩳",
    esim: "≂",
    Eta: "Η",
    eta: "η",
    ETH: "Ð",
    eth: "ð",
    Euml: "Ë",
    euml: "ë",
    euro: "€",
    excl: "!",
    exist: "∃",
    Exists: "∃",
    expectation: "ℰ",
    ExponentialE: "ⅇ",
    exponentiale: "ⅇ",
    fallingdotseq: "≒",
    Fcy: "Ф",
    fcy: "ф",
    female: "♀",
    ffilig: "ﬃ",
    fflig: "ﬀ",
    ffllig: "ﬄ",
    Ffr: "\uD835\uDD09",
    ffr: "\uD835\uDD23",
    filig: "ﬁ",
    FilledSmallSquare: "◼",
    FilledVerySmallSquare: "▪",
    fjlig: "fj",
    flat: "♭",
    fllig: "ﬂ",
    fltns: "▱",
    fnof: "ƒ",
    Fopf: "\uD835\uDD3D",
    fopf: "\uD835\uDD57",
    ForAll: "∀",
    forall: "∀",
    fork: "⋔",
    forkv: "⫙",
    Fouriertrf: "ℱ",
    fpartint: "⨍",
    frac12: "½",
    frac13: "⅓",
    frac14: "¼",
    frac15: "⅕",
    frac16: "⅙",
    frac18: "⅛",
    frac23: "⅔",
    frac25: "⅖",
    frac34: "¾",
    frac35: "⅗",
    frac38: "⅜",
    frac45: "⅘",
    frac56: "⅚",
    frac58: "⅝",
    frac78: "⅞",
    frasl: "⁄",
    frown: "⌢",
    Fscr: "ℱ",
    fscr: "\uD835\uDCBB",
    gacute: "ǵ",
    Gamma: "Γ",
    gamma: "γ",
    Gammad: "Ϝ",
    gammad: "ϝ",
    gap: "⪆",
    Gbreve: "Ğ",
    gbreve: "ğ",
    Gcedil: "Ģ",
    Gcirc: "Ĝ",
    gcirc: "ĝ",
    Gcy: "Г",
    gcy: "г",
    Gdot: "Ġ",
    gdot: "ġ",
    gE: "≧",
    ge: "≥",
    gEl: "⪌",
    gel: "⋛",
    geq: "≥",
    geqq: "≧",
    geqslant: "⩾",
    ges: "⩾",
    gescc: "⪩",
    gesdot: "⪀",
    gesdoto: "⪂",
    gesdotol: "⪄",
    gesl: "⋛︀",
    gesles: "⪔",
    Gfr: "\uD835\uDD0A",
    gfr: "\uD835\uDD24",
    Gg: "⋙",
    gg: "≫",
    ggg: "⋙",
    gimel: "ℷ",
    GJcy: "Ѓ",
    gjcy: "ѓ",
    gl: "≷",
    gla: "⪥",
    glE: "⪒",
    glj: "⪤",
    gnap: "⪊",
    gnapprox: "⪊",
    gnE: "≩",
    gne: "⪈",
    gneq: "⪈",
    gneqq: "≩",
    gnsim: "⋧",
    Gopf: "\uD835\uDD3E",
    gopf: "\uD835\uDD58",
    grave: "`",
    GreaterEqual: "≥",
    GreaterEqualLess: "⋛",
    GreaterFullEqual: "≧",
    GreaterGreater: "⪢",
    GreaterLess: "≷",
    GreaterSlantEqual: "⩾",
    GreaterTilde: "≳",
    Gscr: "\uD835\uDCA2",
    gscr: "ℊ",
    gsim: "≳",
    gsime: "⪎",
    gsiml: "⪐",
    Gt: "≫",
    GT: ">",
    gt: ">",
    gtcc: "⪧",
    gtcir: "⩺",
    gtdot: "⋗",
    gtlPar: "⦕",
    gtquest: "⩼",
    gtrapprox: "⪆",
    gtrarr: "⥸",
    gtrdot: "⋗",
    gtreqless: "⋛",
    gtreqqless: "⪌",
    gtrless: "≷",
    gtrsim: "≳",
    gvertneqq: "≩︀",
    gvnE: "≩︀",
    Hacek: "ˇ",
    hairsp: " ",
    half: "½",
    hamilt: "ℋ",
    HARDcy: "Ъ",
    hardcy: "ъ",
    hArr: "⇔",
    harr: "↔",
    harrcir: "⥈",
    harrw: "↭",
    Hat: "^",
    hbar: "ℏ",
    Hcirc: "Ĥ",
    hcirc: "ĥ",
    hearts: "♥",
    heartsuit: "♥",
    hellip: "…",
    hercon: "⊹",
    Hfr: "ℌ",
    hfr: "\uD835\uDD25",
    HilbertSpace: "ℋ",
    hksearow: "⤥",
    hkswarow: "⤦",
    hoarr: "⇿",
    homtht: "∻",
    hookleftarrow: "↩",
    hookrightarrow: "↪",
    Hopf: "ℍ",
    hopf: "\uD835\uDD59",
    horbar: "―",
    HorizontalLine: "─",
    Hscr: "ℋ",
    hscr: "\uD835\uDCBD",
    hslash: "ℏ",
    Hstrok: "Ħ",
    hstrok: "ħ",
    HumpDownHump: "≎",
    HumpEqual: "≏",
    hybull: "⁃",
    hyphen: "‐",
    Iacute: "Í",
    iacute: "í",
    ic: "⁣",
    Icirc: "Î",
    icirc: "î",
    Icy: "И",
    icy: "и",
    Idot: "İ",
    IEcy: "Е",
    iecy: "е",
    iexcl: "¡",
    iff: "⇔",
    Ifr: "ℑ",
    ifr: "\uD835\uDD26",
    Igrave: "Ì",
    igrave: "ì",
    ii: "ⅈ",
    iiiint: "⨌",
    iiint: "∭",
    iinfin: "⧜",
    iiota: "℩",
    IJlig: "Ĳ",
    ijlig: "ĳ",
    Im: "ℑ",
    Imacr: "Ī",
    imacr: "ī",
    image: "ℑ",
    ImaginaryI: "ⅈ",
    imagline: "ℐ",
    imagpart: "ℑ",
    imath: "ı",
    imof: "⊷",
    imped: "Ƶ",
    Implies: "⇒",
    in: "∈",
    incare: "℅",
    infin: "∞",
    infintie: "⧝",
    inodot: "ı",
    Int: "∬",
    int: "∫",
    intcal: "⊺",
    integers: "ℤ",
    Integral: "∫",
    intercal: "⊺",
    Intersection: "⋂",
    intlarhk: "⨗",
    intprod: "⨼",
    InvisibleComma: "⁣",
    InvisibleTimes: "⁢",
    IOcy: "Ё",
    iocy: "ё",
    Iogon: "Į",
    iogon: "į",
    Iopf: "\uD835\uDD40",
    iopf: "\uD835\uDD5A",
    Iota: "Ι",
    iota: "ι",
    iprod: "⨼",
    iquest: "¿",
    Iscr: "ℐ",
    iscr: "\uD835\uDCBE",
    isin: "∈",
    isindot: "⋵",
    isinE: "⋹",
    isins: "⋴",
    isinsv: "⋳",
    isinv: "∈",
    it: "⁢",
    Itilde: "Ĩ",
    itilde: "ĩ",
    Iukcy: "І",
    iukcy: "і",
    Iuml: "Ï",
    iuml: "ï",
    Jcirc: "Ĵ",
    jcirc: "ĵ",
    Jcy: "Й",
    jcy: "й",
    Jfr: "\uD835\uDD0D",
    jfr: "\uD835\uDD27",
    jmath: "ȷ",
    Jopf: "\uD835\uDD41",
    jopf: "\uD835\uDD5B",
    Jscr: "\uD835\uDCA5",
    jscr: "\uD835\uDCBF",
    Jsercy: "Ј",
    jsercy: "ј",
    Jukcy: "Є",
    jukcy: "є",
    Kappa: "Κ",
    kappa: "κ",
    kappav: "ϰ",
    Kcedil: "Ķ",
    kcedil: "ķ",
    Kcy: "К",
    kcy: "к",
    Kfr: "\uD835\uDD0E",
    kfr: "\uD835\uDD28",
    kgreen: "ĸ",
    KHcy: "Х",
    khcy: "х",
    KJcy: "Ќ",
    kjcy: "ќ",
    Kopf: "\uD835\uDD42",
    kopf: "\uD835\uDD5C",
    Kscr: "\uD835\uDCA6",
    kscr: "\uD835\uDCC0",
    lAarr: "⇚",
    Lacute: "Ĺ",
    lacute: "ĺ",
    laemptyv: "⦴",
    lagran: "ℒ",
    Lambda: "Λ",
    lambda: "λ",
    Lang: "⟪",
    lang: "⟨",
    langd: "⦑",
    langle: "⟨",
    lap: "⪅",
    Laplacetrf: "ℒ",
    laquo: "«",
    Larr: "↞",
    lArr: "⇐",
    larr: "←",
    larrb: "⇤",
    larrbfs: "⤟",
    larrfs: "⤝",
    larrhk: "↩",
    larrlp: "↫",
    larrpl: "⤹",
    larrsim: "⥳",
    larrtl: "↢",
    lat: "⪫",
    lAtail: "⤛",
    latail: "⤙",
    late: "⪭",
    lates: "⪭︀",
    lBarr: "⤎",
    lbarr: "⤌",
    lbbrk: "❲",
    lbrace: "{",
    lbrack: "[",
    lbrke: "⦋",
    lbrksld: "⦏",
    lbrkslu: "⦍",
    Lcaron: "Ľ",
    lcaron: "ľ",
    Lcedil: "Ļ",
    lcedil: "ļ",
    lceil: "⌈",
    lcub: "{",
    Lcy: "Л",
    lcy: "л",
    ldca: "⤶",
    ldquo: "“",
    ldquor: "„",
    ldrdhar: "⥧",
    ldrushar: "⥋",
    ldsh: "↲",
    lE: "≦",
    le: "≤",
    LeftAngleBracket: "⟨",
    LeftArrow: "←",
    Leftarrow: "⇐",
    leftarrow: "←",
    LeftArrowBar: "⇤",
    LeftArrowRightArrow: "⇆",
    leftarrowtail: "↢",
    LeftCeiling: "⌈",
    LeftDoubleBracket: "⟦",
    LeftDownTeeVector: "⥡",
    LeftDownVector: "⇃",
    LeftDownVectorBar: "⥙",
    LeftFloor: "⌊",
    leftharpoondown: "↽",
    leftharpoonup: "↼",
    leftleftarrows: "⇇",
    LeftRightArrow: "↔",
    Leftrightarrow: "⇔",
    leftrightarrow: "↔",
    leftrightarrows: "⇆",
    leftrightharpoons: "⇋",
    leftrightsquigarrow: "↭",
    LeftRightVector: "⥎",
    LeftTee: "⊣",
    LeftTeeArrow: "↤",
    LeftTeeVector: "⥚",
    leftthreetimes: "⋋",
    LeftTriangle: "⊲",
    LeftTriangleBar: "⧏",
    LeftTriangleEqual: "⊴",
    LeftUpDownVector: "⥑",
    LeftUpTeeVector: "⥠",
    LeftUpVector: "↿",
    LeftUpVectorBar: "⥘",
    LeftVector: "↼",
    LeftVectorBar: "⥒",
    lEg: "⪋",
    leg: "⋚",
    leq: "≤",
    leqq: "≦",
    leqslant: "⩽",
    les: "⩽",
    lescc: "⪨",
    lesdot: "⩿",
    lesdoto: "⪁",
    lesdotor: "⪃",
    lesg: "⋚︀",
    lesges: "⪓",
    lessapprox: "⪅",
    lessdot: "⋖",
    lesseqgtr: "⋚",
    lesseqqgtr: "⪋",
    LessEqualGreater: "⋚",
    LessFullEqual: "≦",
    LessGreater: "≶",
    lessgtr: "≶",
    LessLess: "⪡",
    lesssim: "≲",
    LessSlantEqual: "⩽",
    LessTilde: "≲",
    lfisht: "⥼",
    lfloor: "⌊",
    Lfr: "\uD835\uDD0F",
    lfr: "\uD835\uDD29",
    lg: "≶",
    lgE: "⪑",
    lHar: "⥢",
    lhard: "↽",
    lharu: "↼",
    lharul: "⥪",
    lhblk: "▄",
    LJcy: "Љ",
    ljcy: "љ",
    Ll: "⋘",
    ll: "≪",
    llarr: "⇇",
    llcorner: "⌞",
    Lleftarrow: "⇚",
    llhard: "⥫",
    lltri: "◺",
    Lmidot: "Ŀ",
    lmidot: "ŀ",
    lmoust: "⎰",
    lmoustache: "⎰",
    lnap: "⪉",
    lnapprox: "⪉",
    lnE: "≨",
    lne: "⪇",
    lneq: "⪇",
    lneqq: "≨",
    lnsim: "⋦",
    loang: "⟬",
    loarr: "⇽",
    lobrk: "⟦",
    LongLeftArrow: "⟵",
    Longleftarrow: "⟸",
    longleftarrow: "⟵",
    LongLeftRightArrow: "⟷",
    Longleftrightarrow: "⟺",
    longleftrightarrow: "⟷",
    longmapsto: "⟼",
    LongRightArrow: "⟶",
    Longrightarrow: "⟹",
    longrightarrow: "⟶",
    looparrowleft: "↫",
    looparrowright: "↬",
    lopar: "⦅",
    Lopf: "\uD835\uDD43",
    lopf: "\uD835\uDD5D",
    loplus: "⨭",
    lotimes: "⨴",
    lowast: "∗",
    lowbar: "_",
    LowerLeftArrow: "↙",
    LowerRightArrow: "↘",
    loz: "◊",
    lozenge: "◊",
    lozf: "⧫",
    lpar: "(",
    lparlt: "⦓",
    lrarr: "⇆",
    lrcorner: "⌟",
    lrhar: "⇋",
    lrhard: "⥭",
    lrm: "‎",
    lrtri: "⊿",
    lsaquo: "‹",
    Lscr: "ℒ",
    lscr: "\uD835\uDCC1",
    Lsh: "↰",
    lsh: "↰",
    lsim: "≲",
    lsime: "⪍",
    lsimg: "⪏",
    lsqb: "[",
    lsquo: "‘",
    lsquor: "‚",
    Lstrok: "Ł",
    lstrok: "ł",
    Lt: "≪",
    LT: "<",
    lt: "<",
    ltcc: "⪦",
    ltcir: "⩹",
    ltdot: "⋖",
    lthree: "⋋",
    ltimes: "⋉",
    ltlarr: "⥶",
    ltquest: "⩻",
    ltri: "◃",
    ltrie: "⊴",
    ltrif: "◂",
    ltrPar: "⦖",
    lurdshar: "⥊",
    luruhar: "⥦",
    lvertneqq: "≨︀",
    lvnE: "≨︀",
    macr: "¯",
    male: "♂",
    malt: "✠",
    maltese: "✠",
    Map: "⤅",
    map: "↦",
    mapsto: "↦",
    mapstodown: "↧",
    mapstoleft: "↤",
    mapstoup: "↥",
    marker: "▮",
    mcomma: "⨩",
    Mcy: "М",
    mcy: "м",
    mdash: "—",
    mDDot: "∺",
    measuredangle: "∡",
    MediumSpace: " ",
    Mellintrf: "ℳ",
    Mfr: "\uD835\uDD10",
    mfr: "\uD835\uDD2A",
    mho: "℧",
    micro: "µ",
    mid: "∣",
    midast: "*",
    midcir: "⫰",
    middot: "·",
    minus: "−",
    minusb: "⊟",
    minusd: "∸",
    minusdu: "⨪",
    MinusPlus: "∓",
    mlcp: "⫛",
    mldr: "…",
    mnplus: "∓",
    models: "⊧",
    Mopf: "\uD835\uDD44",
    mopf: "\uD835\uDD5E",
    mp: "∓",
    Mscr: "ℳ",
    mscr: "\uD835\uDCC2",
    mstpos: "∾",
    Mu: "Μ",
    mu: "μ",
    multimap: "⊸",
    mumap: "⊸",
    nabla: "∇",
    Nacute: "Ń",
    nacute: "ń",
    nang: "∠⃒",
    nap: "≉",
    napE: "⩰̸",
    napid: "≋̸",
    napos: "ŉ",
    napprox: "≉",
    natur: "♮",
    natural: "♮",
    naturals: "ℕ",
    nbsp: " ",
    nbump: "≎̸",
    nbumpe: "≏̸",
    ncap: "⩃",
    Ncaron: "Ň",
    ncaron: "ň",
    Ncedil: "Ņ",
    ncedil: "ņ",
    ncong: "≇",
    ncongdot: "⩭̸",
    ncup: "⩂",
    Ncy: "Н",
    ncy: "н",
    ndash: "–",
    ne: "≠",
    nearhk: "⤤",
    neArr: "⇗",
    nearr: "↗",
    nearrow: "↗",
    nedot: "≐̸",
    NegativeMediumSpace: "​",
    NegativeThickSpace: "​",
    NegativeThinSpace: "​",
    NegativeVeryThinSpace: "​",
    nequiv: "≢",
    nesear: "⤨",
    nesim: "≂̸",
    NestedGreaterGreater: "≫",
    NestedLessLess: "≪",
    NewLine: `
`,
    nexist: "∄",
    nexists: "∄",
    Nfr: "\uD835\uDD11",
    nfr: "\uD835\uDD2B",
    ngE: "≧̸",
    nge: "≱",
    ngeq: "≱",
    ngeqq: "≧̸",
    ngeqslant: "⩾̸",
    nges: "⩾̸",
    nGg: "⋙̸",
    ngsim: "≵",
    nGt: "≫⃒",
    ngt: "≯",
    ngtr: "≯",
    nGtv: "≫̸",
    nhArr: "⇎",
    nharr: "↮",
    nhpar: "⫲",
    ni: "∋",
    nis: "⋼",
    nisd: "⋺",
    niv: "∋",
    NJcy: "Њ",
    njcy: "њ",
    nlArr: "⇍",
    nlarr: "↚",
    nldr: "‥",
    nlE: "≦̸",
    nle: "≰",
    nLeftarrow: "⇍",
    nleftarrow: "↚",
    nLeftrightarrow: "⇎",
    nleftrightarrow: "↮",
    nleq: "≰",
    nleqq: "≦̸",
    nleqslant: "⩽̸",
    nles: "⩽̸",
    nless: "≮",
    nLl: "⋘̸",
    nlsim: "≴",
    nLt: "≪⃒",
    nlt: "≮",
    nltri: "⋪",
    nltrie: "⋬",
    nLtv: "≪̸",
    nmid: "∤",
    NoBreak: "⁠",
    NonBreakingSpace: " ",
    Nopf: "ℕ",
    nopf: "\uD835\uDD5F",
    Not: "⫬",
    not: "¬",
    NotCongruent: "≢",
    NotCupCap: "≭",
    NotDoubleVerticalBar: "∦",
    NotElement: "∉",
    NotEqual: "≠",
    NotEqualTilde: "≂̸",
    NotExists: "∄",
    NotGreater: "≯",
    NotGreaterEqual: "≱",
    NotGreaterFullEqual: "≧̸",
    NotGreaterGreater: "≫̸",
    NotGreaterLess: "≹",
    NotGreaterSlantEqual: "⩾̸",
    NotGreaterTilde: "≵",
    NotHumpDownHump: "≎̸",
    NotHumpEqual: "≏̸",
    notin: "∉",
    notindot: "⋵̸",
    notinE: "⋹̸",
    notinva: "∉",
    notinvb: "⋷",
    notinvc: "⋶",
    NotLeftTriangle: "⋪",
    NotLeftTriangleBar: "⧏̸",
    NotLeftTriangleEqual: "⋬",
    NotLess: "≮",
    NotLessEqual: "≰",
    NotLessGreater: "≸",
    NotLessLess: "≪̸",
    NotLessSlantEqual: "⩽̸",
    NotLessTilde: "≴",
    NotNestedGreaterGreater: "⪢̸",
    NotNestedLessLess: "⪡̸",
    notni: "∌",
    notniva: "∌",
    notnivb: "⋾",
    notnivc: "⋽",
    NotPrecedes: "⊀",
    NotPrecedesEqual: "⪯̸",
    NotPrecedesSlantEqual: "⋠",
    NotReverseElement: "∌",
    NotRightTriangle: "⋫",
    NotRightTriangleBar: "⧐̸",
    NotRightTriangleEqual: "⋭",
    NotSquareSubset: "⊏̸",
    NotSquareSubsetEqual: "⋢",
    NotSquareSuperset: "⊐̸",
    NotSquareSupersetEqual: "⋣",
    NotSubset: "⊂⃒",
    NotSubsetEqual: "⊈",
    NotSucceeds: "⊁",
    NotSucceedsEqual: "⪰̸",
    NotSucceedsSlantEqual: "⋡",
    NotSucceedsTilde: "≿̸",
    NotSuperset: "⊃⃒",
    NotSupersetEqual: "⊉",
    NotTilde: "≁",
    NotTildeEqual: "≄",
    NotTildeFullEqual: "≇",
    NotTildeTilde: "≉",
    NotVerticalBar: "∤",
    npar: "∦",
    nparallel: "∦",
    nparsl: "⫽⃥",
    npart: "∂̸",
    npolint: "⨔",
    npr: "⊀",
    nprcue: "⋠",
    npre: "⪯̸",
    nprec: "⊀",
    npreceq: "⪯̸",
    nrArr: "⇏",
    nrarr: "↛",
    nrarrc: "⤳̸",
    nrarrw: "↝̸",
    nRightarrow: "⇏",
    nrightarrow: "↛",
    nrtri: "⋫",
    nrtrie: "⋭",
    nsc: "⊁",
    nsccue: "⋡",
    nsce: "⪰̸",
    Nscr: "\uD835\uDCA9",
    nscr: "\uD835\uDCC3",
    nshortmid: "∤",
    nshortparallel: "∦",
    nsim: "≁",
    nsime: "≄",
    nsimeq: "≄",
    nsmid: "∤",
    nspar: "∦",
    nsqsube: "⋢",
    nsqsupe: "⋣",
    nsub: "⊄",
    nsubE: "⫅̸",
    nsube: "⊈",
    nsubset: "⊂⃒",
    nsubseteq: "⊈",
    nsubseteqq: "⫅̸",
    nsucc: "⊁",
    nsucceq: "⪰̸",
    nsup: "⊅",
    nsupE: "⫆̸",
    nsupe: "⊉",
    nsupset: "⊃⃒",
    nsupseteq: "⊉",
    nsupseteqq: "⫆̸",
    ntgl: "≹",
    Ntilde: "Ñ",
    ntilde: "ñ",
    ntlg: "≸",
    ntriangleleft: "⋪",
    ntrianglelefteq: "⋬",
    ntriangleright: "⋫",
    ntrianglerighteq: "⋭",
    Nu: "Ν",
    nu: "ν",
    num: "#",
    numero: "№",
    numsp: " ",
    nvap: "≍⃒",
    nVDash: "⊯",
    nVdash: "⊮",
    nvDash: "⊭",
    nvdash: "⊬",
    nvge: "≥⃒",
    nvgt: ">⃒",
    nvHarr: "⤄",
    nvinfin: "⧞",
    nvlArr: "⤂",
    nvle: "≤⃒",
    nvlt: "<⃒",
    nvltrie: "⊴⃒",
    nvrArr: "⤃",
    nvrtrie: "⊵⃒",
    nvsim: "∼⃒",
    nwarhk: "⤣",
    nwArr: "⇖",
    nwarr: "↖",
    nwarrow: "↖",
    nwnear: "⤧",
    Oacute: "Ó",
    oacute: "ó",
    oast: "⊛",
    ocir: "⊚",
    Ocirc: "Ô",
    ocirc: "ô",
    Ocy: "О",
    ocy: "о",
    odash: "⊝",
    Odblac: "Ő",
    odblac: "ő",
    odiv: "⨸",
    odot: "⊙",
    odsold: "⦼",
    OElig: "Œ",
    oelig: "œ",
    ofcir: "⦿",
    Ofr: "\uD835\uDD12",
    ofr: "\uD835\uDD2C",
    ogon: "˛",
    Ograve: "Ò",
    ograve: "ò",
    ogt: "⧁",
    ohbar: "⦵",
    ohm: "Ω",
    oint: "∮",
    olarr: "↺",
    olcir: "⦾",
    olcross: "⦻",
    oline: "‾",
    olt: "⧀",
    Omacr: "Ō",
    omacr: "ō",
    Omega: "Ω",
    omega: "ω",
    Omicron: "Ο",
    omicron: "ο",
    omid: "⦶",
    ominus: "⊖",
    Oopf: "\uD835\uDD46",
    oopf: "\uD835\uDD60",
    opar: "⦷",
    OpenCurlyDoubleQuote: "“",
    OpenCurlyQuote: "‘",
    operp: "⦹",
    oplus: "⊕",
    Or: "⩔",
    or: "∨",
    orarr: "↻",
    ord: "⩝",
    order: "ℴ",
    orderof: "ℴ",
    ordf: "ª",
    ordm: "º",
    origof: "⊶",
    oror: "⩖",
    orslope: "⩗",
    orv: "⩛",
    oS: "Ⓢ",
    Oscr: "\uD835\uDCAA",
    oscr: "ℴ",
    Oslash: "Ø",
    oslash: "ø",
    osol: "⊘",
    Otilde: "Õ",
    otilde: "õ",
    Otimes: "⨷",
    otimes: "⊗",
    otimesas: "⨶",
    Ouml: "Ö",
    ouml: "ö",
    ovbar: "⌽",
    OverBar: "‾",
    OverBrace: "⏞",
    OverBracket: "⎴",
    OverParenthesis: "⏜",
    par: "∥",
    para: "¶",
    parallel: "∥",
    parsim: "⫳",
    parsl: "⫽",
    part: "∂",
    PartialD: "∂",
    Pcy: "П",
    pcy: "п",
    percnt: "%",
    period: ".",
    permil: "‰",
    perp: "⊥",
    pertenk: "‱",
    Pfr: "\uD835\uDD13",
    pfr: "\uD835\uDD2D",
    Phi: "Φ",
    phi: "φ",
    phiv: "ϕ",
    phmmat: "ℳ",
    phone: "☎",
    Pi: "Π",
    pi: "π",
    pitchfork: "⋔",
    piv: "ϖ",
    planck: "ℏ",
    planckh: "ℎ",
    plankv: "ℏ",
    plus: "+",
    plusacir: "⨣",
    plusb: "⊞",
    pluscir: "⨢",
    plusdo: "∔",
    plusdu: "⨥",
    pluse: "⩲",
    PlusMinus: "±",
    plusmn: "±",
    plussim: "⨦",
    plustwo: "⨧",
    pm: "±",
    Poincareplane: "ℌ",
    pointint: "⨕",
    Popf: "ℙ",
    popf: "\uD835\uDD61",
    pound: "£",
    Pr: "⪻",
    pr: "≺",
    prap: "⪷",
    prcue: "≼",
    prE: "⪳",
    pre: "⪯",
    prec: "≺",
    precapprox: "⪷",
    preccurlyeq: "≼",
    Precedes: "≺",
    PrecedesEqual: "⪯",
    PrecedesSlantEqual: "≼",
    PrecedesTilde: "≾",
    preceq: "⪯",
    precnapprox: "⪹",
    precneqq: "⪵",
    precnsim: "⋨",
    precsim: "≾",
    Prime: "″",
    prime: "′",
    primes: "ℙ",
    prnap: "⪹",
    prnE: "⪵",
    prnsim: "⋨",
    prod: "∏",
    Product: "∏",
    profalar: "⌮",
    profline: "⌒",
    profsurf: "⌓",
    prop: "∝",
    Proportion: "∷",
    Proportional: "∝",
    propto: "∝",
    prsim: "≾",
    prurel: "⊰",
    Pscr: "\uD835\uDCAB",
    pscr: "\uD835\uDCC5",
    Psi: "Ψ",
    psi: "ψ",
    puncsp: " ",
    Qfr: "\uD835\uDD14",
    qfr: "\uD835\uDD2E",
    qint: "⨌",
    Qopf: "ℚ",
    qopf: "\uD835\uDD62",
    qprime: "⁗",
    Qscr: "\uD835\uDCAC",
    qscr: "\uD835\uDCC6",
    quaternions: "ℍ",
    quatint: "⨖",
    quest: "?",
    questeq: "≟",
    QUOT: '"',
    quot: '"',
    rAarr: "⇛",
    race: "∽̱",
    Racute: "Ŕ",
    racute: "ŕ",
    radic: "√",
    raemptyv: "⦳",
    Rang: "⟫",
    rang: "⟩",
    rangd: "⦒",
    range: "⦥",
    rangle: "⟩",
    raquo: "»",
    Rarr: "↠",
    rArr: "⇒",
    rarr: "→",
    rarrap: "⥵",
    rarrb: "⇥",
    rarrbfs: "⤠",
    rarrc: "⤳",
    rarrfs: "⤞",
    rarrhk: "↪",
    rarrlp: "↬",
    rarrpl: "⥅",
    rarrsim: "⥴",
    Rarrtl: "⤖",
    rarrtl: "↣",
    rarrw: "↝",
    rAtail: "⤜",
    ratail: "⤚",
    ratio: "∶",
    rationals: "ℚ",
    RBarr: "⤐",
    rBarr: "⤏",
    rbarr: "⤍",
    rbbrk: "❳",
    rbrace: "}",
    rbrack: "]",
    rbrke: "⦌",
    rbrksld: "⦎",
    rbrkslu: "⦐",
    Rcaron: "Ř",
    rcaron: "ř",
    Rcedil: "Ŗ",
    rcedil: "ŗ",
    rceil: "⌉",
    rcub: "}",
    Rcy: "Р",
    rcy: "р",
    rdca: "⤷",
    rdldhar: "⥩",
    rdquo: "”",
    rdquor: "”",
    rdsh: "↳",
    Re: "ℜ",
    real: "ℜ",
    realine: "ℛ",
    realpart: "ℜ",
    reals: "ℝ",
    rect: "▭",
    REG: "®",
    reg: "®",
    ReverseElement: "∋",
    ReverseEquilibrium: "⇋",
    ReverseUpEquilibrium: "⥯",
    rfisht: "⥽",
    rfloor: "⌋",
    Rfr: "ℜ",
    rfr: "\uD835\uDD2F",
    rHar: "⥤",
    rhard: "⇁",
    rharu: "⇀",
    rharul: "⥬",
    Rho: "Ρ",
    rho: "ρ",
    rhov: "ϱ",
    RightAngleBracket: "⟩",
    RightArrow: "→",
    Rightarrow: "⇒",
    rightarrow: "→",
    RightArrowBar: "⇥",
    RightArrowLeftArrow: "⇄",
    rightarrowtail: "↣",
    RightCeiling: "⌉",
    RightDoubleBracket: "⟧",
    RightDownTeeVector: "⥝",
    RightDownVector: "⇂",
    RightDownVectorBar: "⥕",
    RightFloor: "⌋",
    rightharpoondown: "⇁",
    rightharpoonup: "⇀",
    rightleftarrows: "⇄",
    rightleftharpoons: "⇌",
    rightrightarrows: "⇉",
    rightsquigarrow: "↝",
    RightTee: "⊢",
    RightTeeArrow: "↦",
    RightTeeVector: "⥛",
    rightthreetimes: "⋌",
    RightTriangle: "⊳",
    RightTriangleBar: "⧐",
    RightTriangleEqual: "⊵",
    RightUpDownVector: "⥏",
    RightUpTeeVector: "⥜",
    RightUpVector: "↾",
    RightUpVectorBar: "⥔",
    RightVector: "⇀",
    RightVectorBar: "⥓",
    ring: "˚",
    risingdotseq: "≓",
    rlarr: "⇄",
    rlhar: "⇌",
    rlm: "‏",
    rmoust: "⎱",
    rmoustache: "⎱",
    rnmid: "⫮",
    roang: "⟭",
    roarr: "⇾",
    robrk: "⟧",
    ropar: "⦆",
    Ropf: "ℝ",
    ropf: "\uD835\uDD63",
    roplus: "⨮",
    rotimes: "⨵",
    RoundImplies: "⥰",
    rpar: ")",
    rpargt: "⦔",
    rppolint: "⨒",
    rrarr: "⇉",
    Rrightarrow: "⇛",
    rsaquo: "›",
    Rscr: "ℛ",
    rscr: "\uD835\uDCC7",
    Rsh: "↱",
    rsh: "↱",
    rsqb: "]",
    rsquo: "’",
    rsquor: "’",
    rthree: "⋌",
    rtimes: "⋊",
    rtri: "▹",
    rtrie: "⊵",
    rtrif: "▸",
    rtriltri: "⧎",
    RuleDelayed: "⧴",
    ruluhar: "⥨",
    rx: "℞",
    Sacute: "Ś",
    sacute: "ś",
    sbquo: "‚",
    Sc: "⪼",
    sc: "≻",
    scap: "⪸",
    Scaron: "Š",
    scaron: "š",
    sccue: "≽",
    scE: "⪴",
    sce: "⪰",
    Scedil: "Ş",
    scedil: "ş",
    Scirc: "Ŝ",
    scirc: "ŝ",
    scnap: "⪺",
    scnE: "⪶",
    scnsim: "⋩",
    scpolint: "⨓",
    scsim: "≿",
    Scy: "С",
    scy: "с",
    sdot: "⋅",
    sdotb: "⊡",
    sdote: "⩦",
    searhk: "⤥",
    seArr: "⇘",
    searr: "↘",
    searrow: "↘",
    sect: "§",
    semi: ";",
    seswar: "⤩",
    setminus: "∖",
    setmn: "∖",
    sext: "✶",
    Sfr: "\uD835\uDD16",
    sfr: "\uD835\uDD30",
    sfrown: "⌢",
    sharp: "♯",
    SHCHcy: "Щ",
    shchcy: "щ",
    SHcy: "Ш",
    shcy: "ш",
    ShortDownArrow: "↓",
    ShortLeftArrow: "←",
    shortmid: "∣",
    shortparallel: "∥",
    ShortRightArrow: "→",
    ShortUpArrow: "↑",
    shy: "­",
    Sigma: "Σ",
    sigma: "σ",
    sigmaf: "ς",
    sigmav: "ς",
    sim: "∼",
    simdot: "⩪",
    sime: "≃",
    simeq: "≃",
    simg: "⪞",
    simgE: "⪠",
    siml: "⪝",
    simlE: "⪟",
    simne: "≆",
    simplus: "⨤",
    simrarr: "⥲",
    slarr: "←",
    SmallCircle: "∘",
    smallsetminus: "∖",
    smashp: "⨳",
    smeparsl: "⧤",
    smid: "∣",
    smile: "⌣",
    smt: "⪪",
    smte: "⪬",
    smtes: "⪬︀",
    SOFTcy: "Ь",
    softcy: "ь",
    sol: "/",
    solb: "⧄",
    solbar: "⌿",
    Sopf: "\uD835\uDD4A",
    sopf: "\uD835\uDD64",
    spades: "♠",
    spadesuit: "♠",
    spar: "∥",
    sqcap: "⊓",
    sqcaps: "⊓︀",
    sqcup: "⊔",
    sqcups: "⊔︀",
    Sqrt: "√",
    sqsub: "⊏",
    sqsube: "⊑",
    sqsubset: "⊏",
    sqsubseteq: "⊑",
    sqsup: "⊐",
    sqsupe: "⊒",
    sqsupset: "⊐",
    sqsupseteq: "⊒",
    squ: "□",
    Square: "□",
    square: "□",
    SquareIntersection: "⊓",
    SquareSubset: "⊏",
    SquareSubsetEqual: "⊑",
    SquareSuperset: "⊐",
    SquareSupersetEqual: "⊒",
    SquareUnion: "⊔",
    squarf: "▪",
    squf: "▪",
    srarr: "→",
    Sscr: "\uD835\uDCAE",
    sscr: "\uD835\uDCC8",
    ssetmn: "∖",
    ssmile: "⌣",
    sstarf: "⋆",
    Star: "⋆",
    star: "☆",
    starf: "★",
    straightepsilon: "ϵ",
    straightphi: "ϕ",
    strns: "¯",
    Sub: "⋐",
    sub: "⊂",
    subdot: "⪽",
    subE: "⫅",
    sube: "⊆",
    subedot: "⫃",
    submult: "⫁",
    subnE: "⫋",
    subne: "⊊",
    subplus: "⪿",
    subrarr: "⥹",
    Subset: "⋐",
    subset: "⊂",
    subseteq: "⊆",
    subseteqq: "⫅",
    SubsetEqual: "⊆",
    subsetneq: "⊊",
    subsetneqq: "⫋",
    subsim: "⫇",
    subsub: "⫕",
    subsup: "⫓",
    succ: "≻",
    succapprox: "⪸",
    succcurlyeq: "≽",
    Succeeds: "≻",
    SucceedsEqual: "⪰",
    SucceedsSlantEqual: "≽",
    SucceedsTilde: "≿",
    succeq: "⪰",
    succnapprox: "⪺",
    succneqq: "⪶",
    succnsim: "⋩",
    succsim: "≿",
    SuchThat: "∋",
    Sum: "∑",
    sum: "∑",
    sung: "♪",
    Sup: "⋑",
    sup: "⊃",
    sup1: "¹",
    sup2: "²",
    sup3: "³",
    supdot: "⪾",
    supdsub: "⫘",
    supE: "⫆",
    supe: "⊇",
    supedot: "⫄",
    Superset: "⊃",
    SupersetEqual: "⊇",
    suphsol: "⟉",
    suphsub: "⫗",
    suplarr: "⥻",
    supmult: "⫂",
    supnE: "⫌",
    supne: "⊋",
    supplus: "⫀",
    Supset: "⋑",
    supset: "⊃",
    supseteq: "⊇",
    supseteqq: "⫆",
    supsetneq: "⊋",
    supsetneqq: "⫌",
    supsim: "⫈",
    supsub: "⫔",
    supsup: "⫖",
    swarhk: "⤦",
    swArr: "⇙",
    swarr: "↙",
    swarrow: "↙",
    swnwar: "⤪",
    szlig: "ß",
    Tab: "\t",
    target: "⌖",
    Tau: "Τ",
    tau: "τ",
    tbrk: "⎴",
    Tcaron: "Ť",
    tcaron: "ť",
    Tcedil: "Ţ",
    tcedil: "ţ",
    Tcy: "Т",
    tcy: "т",
    tdot: "⃛",
    telrec: "⌕",
    Tfr: "\uD835\uDD17",
    tfr: "\uD835\uDD31",
    there4: "∴",
    Therefore: "∴",
    therefore: "∴",
    Theta: "Θ",
    theta: "θ",
    thetasym: "ϑ",
    thetav: "ϑ",
    thickapprox: "≈",
    thicksim: "∼",
    ThickSpace: "  ",
    thinsp: " ",
    ThinSpace: " ",
    thkap: "≈",
    thksim: "∼",
    THORN: "Þ",
    thorn: "þ",
    Tilde: "∼",
    tilde: "˜",
    TildeEqual: "≃",
    TildeFullEqual: "≅",
    TildeTilde: "≈",
    times: "×",
    timesb: "⊠",
    timesbar: "⨱",
    timesd: "⨰",
    tint: "∭",
    toea: "⤨",
    top: "⊤",
    topbot: "⌶",
    topcir: "⫱",
    Topf: "\uD835\uDD4B",
    topf: "\uD835\uDD65",
    topfork: "⫚",
    tosa: "⤩",
    tprime: "‴",
    TRADE: "™",
    trade: "™",
    triangle: "▵",
    triangledown: "▿",
    triangleleft: "◃",
    trianglelefteq: "⊴",
    triangleq: "≜",
    triangleright: "▹",
    trianglerighteq: "⊵",
    tridot: "◬",
    trie: "≜",
    triminus: "⨺",
    TripleDot: "⃛",
    triplus: "⨹",
    trisb: "⧍",
    tritime: "⨻",
    trpezium: "⏢",
    Tscr: "\uD835\uDCAF",
    tscr: "\uD835\uDCC9",
    TScy: "Ц",
    tscy: "ц",
    TSHcy: "Ћ",
    tshcy: "ћ",
    Tstrok: "Ŧ",
    tstrok: "ŧ",
    twixt: "≬",
    twoheadleftarrow: "↞",
    twoheadrightarrow: "↠",
    Uacute: "Ú",
    uacute: "ú",
    Uarr: "↟",
    uArr: "⇑",
    uarr: "↑",
    Uarrocir: "⥉",
    Ubrcy: "Ў",
    ubrcy: "ў",
    Ubreve: "Ŭ",
    ubreve: "ŭ",
    Ucirc: "Û",
    ucirc: "û",
    Ucy: "У",
    ucy: "у",
    udarr: "⇅",
    Udblac: "Ű",
    udblac: "ű",
    udhar: "⥮",
    ufisht: "⥾",
    Ufr: "\uD835\uDD18",
    ufr: "\uD835\uDD32",
    Ugrave: "Ù",
    ugrave: "ù",
    uHar: "⥣",
    uharl: "↿",
    uharr: "↾",
    uhblk: "▀",
    ulcorn: "⌜",
    ulcorner: "⌜",
    ulcrop: "⌏",
    ultri: "◸",
    Umacr: "Ū",
    umacr: "ū",
    uml: "¨",
    UnderBar: "_",
    UnderBrace: "⏟",
    UnderBracket: "⎵",
    UnderParenthesis: "⏝",
    Union: "⋃",
    UnionPlus: "⊎",
    Uogon: "Ų",
    uogon: "ų",
    Uopf: "\uD835\uDD4C",
    uopf: "\uD835\uDD66",
    UpArrow: "↑",
    Uparrow: "⇑",
    uparrow: "↑",
    UpArrowBar: "⤒",
    UpArrowDownArrow: "⇅",
    UpDownArrow: "↕",
    Updownarrow: "⇕",
    updownarrow: "↕",
    UpEquilibrium: "⥮",
    upharpoonleft: "↿",
    upharpoonright: "↾",
    uplus: "⊎",
    UpperLeftArrow: "↖",
    UpperRightArrow: "↗",
    Upsi: "ϒ",
    upsi: "υ",
    upsih: "ϒ",
    Upsilon: "Υ",
    upsilon: "υ",
    UpTee: "⊥",
    UpTeeArrow: "↥",
    upuparrows: "⇈",
    urcorn: "⌝",
    urcorner: "⌝",
    urcrop: "⌎",
    Uring: "Ů",
    uring: "ů",
    urtri: "◹",
    Uscr: "\uD835\uDCB0",
    uscr: "\uD835\uDCCA",
    utdot: "⋰",
    Utilde: "Ũ",
    utilde: "ũ",
    utri: "▵",
    utrif: "▴",
    uuarr: "⇈",
    Uuml: "Ü",
    uuml: "ü",
    uwangle: "⦧",
    vangrt: "⦜",
    varepsilon: "ϵ",
    varkappa: "ϰ",
    varnothing: "∅",
    varphi: "ϕ",
    varpi: "ϖ",
    varpropto: "∝",
    vArr: "⇕",
    varr: "↕",
    varrho: "ϱ",
    varsigma: "ς",
    varsubsetneq: "⊊︀",
    varsubsetneqq: "⫋︀",
    varsupsetneq: "⊋︀",
    varsupsetneqq: "⫌︀",
    vartheta: "ϑ",
    vartriangleleft: "⊲",
    vartriangleright: "⊳",
    Vbar: "⫫",
    vBar: "⫨",
    vBarv: "⫩",
    Vcy: "В",
    vcy: "в",
    VDash: "⊫",
    Vdash: "⊩",
    vDash: "⊨",
    vdash: "⊢",
    Vdashl: "⫦",
    Vee: "⋁",
    vee: "∨",
    veebar: "⊻",
    veeeq: "≚",
    vellip: "⋮",
    Verbar: "‖",
    verbar: "|",
    Vert: "‖",
    vert: "|",
    VerticalBar: "∣",
    VerticalLine: "|",
    VerticalSeparator: "❘",
    VerticalTilde: "≀",
    VeryThinSpace: " ",
    Vfr: "\uD835\uDD19",
    vfr: "\uD835\uDD33",
    vltri: "⊲",
    vnsub: "⊂⃒",
    vnsup: "⊃⃒",
    Vopf: "\uD835\uDD4D",
    vopf: "\uD835\uDD67",
    vprop: "∝",
    vrtri: "⊳",
    Vscr: "\uD835\uDCB1",
    vscr: "\uD835\uDCCB",
    vsubnE: "⫋︀",
    vsubne: "⊊︀",
    vsupnE: "⫌︀",
    vsupne: "⊋︀",
    Vvdash: "⊪",
    vzigzag: "⦚",
    Wcirc: "Ŵ",
    wcirc: "ŵ",
    wedbar: "⩟",
    Wedge: "⋀",
    wedge: "∧",
    wedgeq: "≙",
    weierp: "℘",
    Wfr: "\uD835\uDD1A",
    wfr: "\uD835\uDD34",
    Wopf: "\uD835\uDD4E",
    wopf: "\uD835\uDD68",
    wp: "℘",
    wr: "≀",
    wreath: "≀",
    Wscr: "\uD835\uDCB2",
    wscr: "\uD835\uDCCC",
    xcap: "⋂",
    xcirc: "◯",
    xcup: "⋃",
    xdtri: "▽",
    Xfr: "\uD835\uDD1B",
    xfr: "\uD835\uDD35",
    xhArr: "⟺",
    xharr: "⟷",
    Xi: "Ξ",
    xi: "ξ",
    xlArr: "⟸",
    xlarr: "⟵",
    xmap: "⟼",
    xnis: "⋻",
    xodot: "⨀",
    Xopf: "\uD835\uDD4F",
    xopf: "\uD835\uDD69",
    xoplus: "⨁",
    xotime: "⨂",
    xrArr: "⟹",
    xrarr: "⟶",
    Xscr: "\uD835\uDCB3",
    xscr: "\uD835\uDCCD",
    xsqcup: "⨆",
    xuplus: "⨄",
    xutri: "△",
    xvee: "⋁",
    xwedge: "⋀",
    Yacute: "Ý",
    yacute: "ý",
    YAcy: "Я",
    yacy: "я",
    Ycirc: "Ŷ",
    ycirc: "ŷ",
    Ycy: "Ы",
    ycy: "ы",
    yen: "¥",
    Yfr: "\uD835\uDD1C",
    yfr: "\uD835\uDD36",
    YIcy: "Ї",
    yicy: "ї",
    Yopf: "\uD835\uDD50",
    yopf: "\uD835\uDD6A",
    Yscr: "\uD835\uDCB4",
    yscr: "\uD835\uDCCE",
    YUcy: "Ю",
    yucy: "ю",
    Yuml: "Ÿ",
    yuml: "ÿ",
    Zacute: "Ź",
    zacute: "ź",
    Zcaron: "Ž",
    zcaron: "ž",
    Zcy: "З",
    zcy: "з",
    Zdot: "Ż",
    zdot: "ż",
    zeetrf: "ℨ",
    ZeroWidthSpace: "​",
    Zeta: "Ζ",
    zeta: "ζ",
    Zfr: "ℨ",
    zfr: "\uD835\uDD37",
    ZHcy: "Ж",
    zhcy: "ж",
    zigrarr: "⇝",
    Zopf: "ℤ",
    zopf: "\uD835\uDD6B",
    Zscr: "\uD835\uDCB5",
    zscr: "\uD835\uDCCF",
    zwj: "‍",
    zwnj: "‌"
  });
  RJ5.entityMap = RJ5.HTML_ENTITIES
})