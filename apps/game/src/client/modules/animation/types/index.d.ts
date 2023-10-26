declare namespace Animation {
  type Task = {
    dictionary: string;
    name: string;
    flags?: import('../animation-flags').AnimationFlag;
    entity?: number;
    blendInSpeed?: number;
    blendOutSpeed?: number;
    duration?: number;
    playbackRate?: number;
  };
}
