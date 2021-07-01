import { useLayoutEffect, useEffect } from "react";

const useCorrectEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

export default useCorrectEffect;