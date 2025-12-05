import { customAlphabet } from 'nanoid';

// 혼동 방지 문자 제외 (0, o, l, 1, i)
const alphabet = '23456789abcdefghjkmnpqrstuvwxyz';

// 6자리 ID 생성 (30^6 = 약 7억 조합)
const nanoid = customAlphabet(alphabet, 6);

export const generateShortId = () => nanoid();
