import { useCallback, useEffect, useId, useRef, useState } from "react";
import type { KeyboardEvent as ReactKeyboardEvent } from "react";
import styled from "@emotion/styled";
import { useTheme } from "@/hooks";
import { Icon, Text } from "@/components";
import type { Props } from "./Dropdown.types";
import { Search } from "../Search";

const Wrapper = styled.div`
  position: relative;
  display: inline-block;
`;

const TriggerButton = styled.button<
  Pick<Props, "isOpen" | "$width" | "$color" | "$isNoneBorder">
>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  height: 40px;
  padding: 0 16px;
  font-size: ${({ theme }) => theme.font.body3.fontSize};
  line-height: ${({ theme }) => theme.font.body3.lineHeight};
  border: 1px solid
    ${({ theme, $color }) => $color || theme.color.grayScale[50]};
  ${({ $isNoneBorder }) =>
    $isNoneBorder &&
    `
      border: none;
    `}
  border-radius: 8px;
  background: ${({ theme }) => theme.color.grayScale[10]};
  cursor: pointer;
  min-width: ${({ $width }) => $width};
  /* 색을 지정한 드롭다운(상태변경 등)은 열려도 같은 색을 유지한다 */
  ${({ isOpen, theme, $color }) =>
    isOpen &&
    `
      border-color: ${$color || theme.color.grayScale[90]};
    `}
  color: ${({ theme, $color }) => $color || theme.color.grayScale[60]};
  white-space: nowrap;
`;

const OptionsWrapper = styled.div`
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  width: 100%;
  z-index: 10;
`;

const DefaultOptions = styled.ul`
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  min-width: 100%;
  width: max-content;
  max-height: 320px;
  overflow-y: auto;
  box-shadow: 0px 4px 20px rgba(112, 144, 176, 0.12);
  border-radius: 8px;
  background: ${({ theme }) => theme.color.grayScale[10]};
  list-style: none;
  padding: 8px 0;
  margin: 0;
  z-index: 10;
  color: ${({ theme }) => theme.color.grayScale[60]};
  font-size: ${({ theme }) => theme.font.caption.fontSize};
  line-height: ${({ theme }) => theme.font.caption.lineHeight};
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const DefaultOption = styled.li<{ $selected: boolean }>`
  white-space: nowrap;
  padding: 8px 22px;
  cursor: pointer;

  &:hover {
    color: ${({ theme }) => theme.color.primary[30]};
  }

  ${({ $selected, theme }) =>
    $selected &&
    `
      color: ${theme.color.primary[20]};
    `}
`;

/* supportJob 스타일 */
const SupportJobOptions = styled.div`
  box-shadow: 0px 4px 20px rgba(112, 144, 176, 0.12);
  border-radius: 8px;
  background-color: ${({ theme }) => theme.color.grayScale[10]};
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 399px;
  padding: 20px;
  height: 392px;
`;

const SupportJobTagList = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  gap: 10px;
  flex: 1;
  min-height: 0;
  overflow-y: auto;
`;

// 고른 태그는 채운 파란색으로 바꿔 선택 여부가 보이게 한다
const SupportJobTag = styled.button<{ $selected: boolean }>`
  padding: 6px 16px;
  border-radius: 100px;
  background: ${({ theme, $selected }) =>
    $selected ? theme.color.primary[20] : theme.color.subColor.blue[20]};
  width: fit-content;
  cursor: pointer;
  border: none;
`;

export const Dropdown = ({
  onChange,
  $placeholder,
  type,
  $width,
  isOpen: externalIsOpen,
  onToggle,
  $color,
  value: externalValue,
  options,
  $isNoneBorder,
  $defaultValue
}: Props) => {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const isOpen = externalIsOpen !== undefined ? externalIsOpen : internalIsOpen;
  const [internalSelected, setInternalSelected] = useState<string | null>(
    $defaultValue ? $defaultValue : null
  );
  const selected =
    externalValue !== undefined ? externalValue : internalSelected;
  const [searchTerm, setSearchTerm] = useState("");
  const wrapperRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const optionRefs = useRef<Array<HTMLLIElement | null>>([]);
  const triggerId = useId();
  const listId = useId();
  const isListbox = type === undefined;
  // 로빙 tabindex: 고른 항목(없으면 첫 항목)만 Tab으로 들어오고 나머지는 화살표로 옮긴다
  const initialIndex = Math.max(
    options.findIndex(o => o.value === selected),
    0
  );

  const openDropdown = () => {
    if (onToggle) {
      onToggle(true);
    } else {
      setInternalIsOpen(true);
    }
  };

  const closeDropdown = useCallback(() => {
    if (onToggle) {
      onToggle(false);
    } else {
      setInternalIsOpen(false);
    }
  }, [onToggle]);

  // 열려 있을 때 Escape를 누르면 닫고 초점을 열기 버튼으로 돌려준다
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      // 한글 조합 중이거나 다른 곳에서 이미 처리한 Escape는 넘긴다
      const isHandled = event.isComposing || event.defaultPrevented;
      if (event.key !== "Escape" || isHandled) return;
      // 다른 입력칸에 있던 초점은 빼앗지 않는다
      const active = document.activeElement;
      const isFocusInside =
        !active ||
        active === document.body ||
        wrapperRef.current?.contains(active);
      closeDropdown();
      if (isFocusInside) triggerRef.current?.focus();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, closeDropdown]);

  // 목록을 열면 고른 항목(없으면 첫 항목)으로 초점을 옮긴다
  useEffect(() => {
    if (!isOpen || !isListbox) return;
    optionRefs.current[initialIndex]?.focus();
  }, [isOpen, isListbox, initialIndex]);

  const handleSelect = (value: string) => {
    if (externalValue === undefined) {
      setInternalSelected(value);
    }
    onChange?.(value);
    closeDropdown();
  };

  const selectWithKeyboard = (value: string) => {
    handleSelect(value);
    triggerRef.current?.focus();
  };

  const focusOption = (index: number) => {
    const lastIndex = options.length - 1;
    optionRefs.current[Math.min(Math.max(index, 0), lastIndex)]?.focus();
  };

  const handleTriggerKeyDown = (
    event: ReactKeyboardEvent<HTMLButtonElement>
  ) => {
    if (!isListbox || event.key !== "ArrowDown") return;
    event.preventDefault();
    if (isOpen) {
      focusOption(initialIndex);
    } else {
      openDropdown();
    }
  };

  const handleOptionKeyDown =
    (index: number) => (event: ReactKeyboardEvent<HTMLLIElement>) => {
      switch (event.key) {
        case "ArrowDown":
          event.preventDefault();
          focusOption(index + 1);
          break;
        case "ArrowUp":
          event.preventDefault();
          focusOption(index - 1);
          break;
        case "Home":
          event.preventDefault();
          focusOption(0);
          break;
        case "End":
          event.preventDefault();
          focusOption(options.length - 1);
          break;
        case "Enter":
          event.preventDefault();
          selectWithKeyboard(options[index].value);
          break;
        // 스페이스는 keyup에서 고른다. keydown에서 초점을 옮기면 Firefox가 keyup으로 열기 버튼을 다시 누를 수 있다
        case " ":
          event.preventDefault();
          break;
        // Tab으로 목록을 벗어나면 닫는다. 초점은 브라우저가 옮기는 대로 둔다
        case "Tab":
          closeDropdown();
          break;
      }
    };

  const handleOptionKeyUp =
    (value: string) => (event: ReactKeyboardEvent<HTMLLIElement>) => {
      if (event.key !== " ") return;
      event.preventDefault();
      selectWithKeyboard(value);
    };

  const selectedLabel = options.find(o => o.value === selected)?.label;
  const filteredOptions =
    type === "supportJob"
      ? options.filter(opt =>
          opt.label.toLowerCase().includes(searchTerm.toLowerCase())
        )
      : options;
  const { currentTheme: theme } = useTheme();

  const getDisplayText = () => {
    return selectedLabel || $placeholder || "선택";
  };

  return (
    <Wrapper ref={wrapperRef}>
      <TriggerButton
        ref={triggerRef}
        id={triggerId}
        type="button"
        aria-haspopup={isListbox ? "listbox" : "dialog"}
        aria-expanded={isOpen}
        aria-controls={isOpen ? listId : undefined}
        isOpen={isOpen}
        onClick={() => {
          const newValue = !isOpen;
          if (onToggle) {
            onToggle(newValue);
          } else {
            setInternalIsOpen(newValue);
          }
        }}
        onKeyDown={handleTriggerKeyDown}
        $width={typeof $width === "number" ? `${$width}px` : $width}
        $color={$color}
        $isNoneBorder={$isNoneBorder}
      >
        {getDisplayText()}
        {/* 아이콘 이름(ChevronDown)이 버튼 이름에 섞여 읽히지 않게 숨긴다 */}
        <Icon
          icon={isOpen ? "ChevronUp" : "ChevronDown"}
          size={16}
          fillColor={$color || theme.color.grayScale[60]}
          aria-hidden
        />
      </TriggerButton>

      {isOpen && (
        <OptionsWrapper>
          {isListbox && (
            <DefaultOptions
              id={listId}
              role="listbox"
              aria-labelledby={triggerId}
            >
              {options.map((opt, index) => {
                return (
                  <DefaultOption
                    key={opt.value}
                    ref={element => {
                      optionRefs.current[index] = element;
                    }}
                    role="option"
                    aria-selected={opt.value === selected}
                    tabIndex={index === initialIndex ? 0 : -1}
                    $selected={opt.value === selected}
                    onClick={() => handleSelect(opt.value)}
                    onKeyDown={handleOptionKeyDown(index)}
                    onKeyUp={handleOptionKeyUp(opt.value)}
                  >
                    {opt.label}
                  </DefaultOption>
                );
              })}
            </DefaultOptions>
          )}

          {type === "supportJob" && (
            <SupportJobOptions
              id={listId}
              role="dialog"
              aria-label={$placeholder || "선택"}
            >
              <Search
                $width={359}
                placeholder="검색어를 입력해주세요"
                onChange={value => setSearchTerm(value)}
                value={searchTerm}
                IconFillColor={theme.color.grayScale[60]}
              />
              <div
                style={{
                  height: "1px",
                  flexShrink: 0,
                  backgroundColor: theme.color.grayScale[40]
                }}
              />
              {/* 태그가 많으면 패널 밖으로 넘치지 않고 이 영역만 스크롤된다 */}
              <SupportJobTagList>
                {filteredOptions.length > 0 ? (
                  filteredOptions?.map(opt => (
                    <SupportJobTag
                      key={opt.value}
                      type="button"
                      aria-pressed={opt.value === selected}
                      $selected={opt.value === selected}
                      // 전체 보기 옵션이 없어 고른 태그를 다시 누르면 선택을 푼다
                      onClick={() =>
                        handleSelect(opt.value === selected ? "" : opt.value)
                      }
                    >
                      <Text
                        $size="caption"
                        $weight="regular"
                        $color={
                          opt.value === selected
                            ? theme.color.grayScale[10]
                            : theme.color.subColor.blue[30]
                        }
                      >
                        {opt.label}
                      </Text>
                    </SupportJobTag>
                  ))
                ) : (
                  <Text
                    $size="body3"
                    $weight="regular"
                    $color={theme.color.grayScale[60]}
                  >
                    검색 결과가 없습니다.
                  </Text>
                )}
              </SupportJobTagList>
            </SupportJobOptions>
          )}
        </OptionsWrapper>
      )}
    </Wrapper>
  );
};
