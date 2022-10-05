const abstractiveSummaryData = {
    title: "Abstractive Summarisation",
    description: "The Bart model was proposed in BART: Denoising Sequence-to-Sequence Pre-training for Natural Language Generation, Translation, and Comprehension. The pretraining task involves randomly shuffling the order of the original sentences and a novel in-filling scheme, where spans of text are replaced with a single mask token.",
    gitHubLink: "https://github.com/fwbrandao/Abstractive_Summarisation/blob/main/Bart-CNN%20Abstractive%20Summarisation.ipynb",
    literactureLink: "https://arxiv.org/abs/1910.13461",
    infoExpantion: {
        firstHeader: "What is Summarization?",
        firstText: "Summarization, is to reduce the size of the document while preserving the meaning, is one of the most researched areas among the Natural Language Processing (NLP) community. Summarization techniques, on the basis of whether the exact sentences are considered as they appear in the original text or new sentences are generated using natural language processing techniques, are categorized into extractive and abstractive techniques. Extractive summarization has been a very extensively researched topic and has reached to its maturity stage. The complexities underlying with the natural language text makes abstractive summarization a difficult and a challenging task. Now the research has shifted towards the Abstractive Summarization.",
        secondHeader: "Abstractive Text Summarization",
        secondText: "Abstractive Text Summarization is the task of generating a short and concise summary that captures the salient ideas of the source text. The generated summaries potentially contain new phrases and sentences that may not appear in the source text.",
        thirdHeader: "Facebook-Bart-CNN-Model",
        thirdText: "BART is particularly effective when fine tuned for text generation but also works well for comprehension tasks. It matches the performance of RoBERTa with comparable training resources on GLUE and SQuAD, achieves new state-of-the-art results on a range of abstractive dialogue, question answering, and summarization tasks, with gains of up to 6 ROUGE.",
    }
}

export default abstractiveSummaryData;
