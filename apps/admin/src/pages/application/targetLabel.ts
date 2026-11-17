const NAME_PREVIEW_COUNT = 3;

// "김정현, 김주원, 강용수 외 3명의" 처럼 앞의 몇 명만 이름을 보여 준다
export const getTargetLabel = (names: string[]) => {
  const preview = names.slice(0, NAME_PREVIEW_COUNT).join(", ");
  const rest = names.length - NAME_PREVIEW_COUNT;
  return rest > 0 ? `${preview} 외 ${rest}명의` : `${preview}의`;
};
