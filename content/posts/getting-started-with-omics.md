I came to omics from machine learning, and my first few weeks felt like learning a new language. This is the short guide I wish I had back then. **You don't need to become a biologist to work with omics data, but you do need to know what each dataset measures and what each measurement looks like.** That's all this post tries to give you, plus a list of places to go next.

## The Big Picture

**TLDR: every "-omics" field measures one layer of how a cell turns its DNA into action.**

Almost everything in omics hangs on one idea, the **central dogma**: **DNA** is transcribed into **RNA**, and RNA is translated into **proteins**. Proteins do most of the work in a cell, including making and breaking down small molecules (**metabolites**). On top of that, the **epigenome** controls which parts of the DNA are switched on or off.

Each "-omics" field takes a snapshot of one of these layers, often measuring thousands of molecules in a single experiment. As you move from DNA towards metabolites, you get closer to what the cell is actually doing right now, but the measurements also get harder and noisier.

<figure>
  <img src="assets/img/blog/getting-started-with-omics/central-dogma.svg" alt="Diagram: DNA is transcribed to RNA, translated to protein, and proteins make metabolites. Genomics, transcriptomics, proteomics and metabolomics measure each layer; epigenomics controls which genes are switched on.">
</figure>

## A Field Guide to Omics Data

**TLDR: most omics datasets end up as a big table of numbers. What changes is what's being measured and what the values look like.**

### Genomics

<figure class="omics-icon">
  <img src="assets/img/blog/getting-started-with-omics/genomics.svg" alt="Diagram: a DNA double helix read as a sequence of letters, with one letter highlighted as a variant compared with the reference genome.">
</figure>

Measures the **DNA sequence**, and especially how it differs from a reference genome (variants). Data: samples × variants, with values 0, 1 or 2 (copies of each variant). Typical question: which variants are linked to a disease?

### Epigenomics

<figure class="omics-icon">
  <img src="assets/img/blog/getting-started-with-omics/epigenomics.svg" alt="Diagram: a DNA strand with two genes. Gene A has methylation marks and is switched off; gene B has none and is switched on.">
</figure>

Measures the **chemical marks on DNA** that switch genes on or off, without changing the sequence. The most common is DNA methylation: samples × sites, with values between 0 and 1. Typical question: how does gene regulation change with age or disease?

### Transcriptomics

<figure class="omics-icon">
  <img src="assets/img/blog/getting-started-with-omics/transcriptomics.svg" alt="Diagram: a piece of tissue made of many cells is averaged into one bar chart showing how active each gene is.">
</figure>

Measures **which genes are active, and how much**, by counting RNA molecules. Bulk RNA-seq averages over all cells in a tissue sample. Data: genes × samples, filled with counts. Typical question: which genes differ between healthy and diseased tissue?

### Single-cell transcriptomics

<figure class="omics-icon">
  <img src="assets/img/blog/getting-started-with-omics/single-cell.svg" alt="Diagram: three separate cells, each with its own bar chart of gene activity.">
</figure>

The same, but **for each individual cell**. Data: cells × genes, mostly zeros. Typical question: which cell types are present, and what is each one doing?

### Spatial transcriptomics

<figure class="omics-icon">
  <img src="assets/img/blog/getting-started-with-omics/spatial.svg" alt="Diagram: a tissue covered in colored spots; one spot is highlighted, showing its location and its own bar chart of gene activity.">
</figure>

Gene expression **plus where it happens** in the tissue. Data: cells (or small spots) × genes, plus x, y coordinates and often a microscope image. Typical question: how is the tissue organized? This is what I'm working on right now.

Spatial data comes in two main flavors. **Sequencing-based** methods (like 10x Visium) measure all genes, but each spot mixes several cells. **Imaging-based** methods (like MERFISH or Xenium) see individual molecules inside single cells, but only for a pre-chosen set of genes.

### Proteomics

<figure class="omics-icon">
  <img src="assets/img/blog/getting-started-with-omics/proteomics.svg" alt="Diagram: protein shapes measured by mass spectrometry, giving a spectrum of peaks for which proteins are present and how much.">
</figure>

Measures **which proteins are present, and how much**, usually with mass spectrometry. Closer to what the cell is doing than RNA. Data: samples × proteins, with many missing values. Typical question: which proteins change in disease?

### Metabolomics

<figure class="omics-icon">
  <img src="assets/img/blog/getting-started-with-omics/metabolomics.svg" alt="Diagram: small molecules such as sugars, lipids and amino acids measured into a bar chart of how much of each molecule there is.">
</figure>

Measures **small molecules** such as sugars, lipids and drugs: the end products of everything above. Data: samples × molecules, many of which are hard to identify. Typical question: how does metabolism change with diet, drugs or disease?

### Multi-omics

<figure class="omics-icon">
  <img src="assets/img/blog/getting-started-with-omics/multi-omics.svg" alt="Diagram: one sample measured as DNA, RNA and protein layers, which are then combined into one table.">
</figure>

Combines **several layers for the same samples**, or even the same cells. It gives the fullest picture, but each layer has its own noise and gaps, and combining them is still an open problem.

## Where to Go Next

**Learn the basics**

- [Modern Statistics for Modern Biology](https://www.huber.embl.de/msmb/): a free book on statistics for biological data.
- [Harvard Chan Bioinformatics Core training](https://hbctraining.github.io/main/): beginner-friendly lessons on RNA-seq and single-cell.

**Tools and tutorials**

- [Single-cell best practices](https://www.sc-best-practices.org): the best place to start, in Python.
- [Scanpy](https://scanpy.scverse.org) and [Seurat](https://satijalab.org/seurat/): the standard single-cell toolkits (Python and R).
- [Squidpy](https://squidpy.readthedocs.io): spatial analysis in Python.
- [DESeq2](https://bioconductor.org/packages/DESeq2): the standard tool for comparing gene expression between groups.

**Find data**

- [CELLxGENE](https://cellxgene.cziscience.com): curated single-cell datasets, ready to download.
- [GEO](https://www.ncbi.nlm.nih.gov/geo/): the largest public archive of gene expression data.
- [10x Genomics datasets](https://www.10xgenomics.com/datasets): free single-cell and spatial examples.
- [GDC / TCGA](https://portal.gdc.cancer.gov): multi-omics data from thousands of tumors.

## Citation

If you find this blog useful, please cite it as:

```
Ioanna Gemou, "Getting Started with Omics Data", igemou.github.io, 2026.
```

```
@misc{gemou2026omics,
  author = {Ioanna Gemou},
  title = {Getting Started with Omics Data},
  year = {2026},
  howpublished = {\url{https://igemou.github.io/blog.html?post=getting-started-with-omics}}
}
```

## References

Hao, Y., Stuart, T., Kowalski, M. H., et al. (2024). Dictionary learning for integrative, multimodal and scalable single-cell analysis. *Nature Biotechnology*, 42, 293–304. [https://doi.org/10.1038/s41587-023-01767-y](https://doi.org/10.1038/s41587-023-01767-y)

Hasin, Y., Seldin, M., & Lusis, A. (2017). Multi-omics approaches to disease. *Genome Biology*, 18, 83. [https://doi.org/10.1186/s13059-017-1215-1](https://doi.org/10.1186/s13059-017-1215-1)

Heumos, L., Schaar, A. C., Lance, C., et al. (2023). Best practices for single-cell analysis across modalities. *Nature Reviews Genetics*, 24, 550–572. [https://doi.org/10.1038/s41576-023-00586-w](https://doi.org/10.1038/s41576-023-00586-w)

Holmes, S., & Huber, W. (2019). *Modern Statistics for Modern Biology*. Cambridge University Press. [https://www.huber.embl.de/msmb/](https://www.huber.embl.de/msmb/)

Love, M. I., Huber, W., & Anders, S. (2014). Moderated estimation of fold change and dispersion for RNA-seq data with DESeq2. *Genome Biology*, 15, 550. [https://doi.org/10.1186/s13059-014-0550-8](https://doi.org/10.1186/s13059-014-0550-8)

Moses, L., & Pachter, L. (2022). Museum of spatial transcriptomics. *Nature Methods*, 19, 534–546. [https://doi.org/10.1038/s41592-022-01409-2](https://doi.org/10.1038/s41592-022-01409-2)

Palla, G., Spitzer, H., Klein, M., et al. (2022). Squidpy: a scalable framework for spatial omics analysis. *Nature Methods*, 19, 171–178. [https://doi.org/10.1038/s41592-021-01358-2](https://doi.org/10.1038/s41592-021-01358-2)

Wolf, F. A., Angerer, P., & Theis, F. J. (2018). SCANPY: large-scale single-cell gene expression data analysis. *Genome Biology*, 19, 15. [https://doi.org/10.1186/s13059-017-1382-0](https://doi.org/10.1186/s13059-017-1382-0)
