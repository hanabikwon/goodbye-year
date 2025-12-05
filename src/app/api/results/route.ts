import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { generateShortId } from '@/utils/generateId';

// POST: 결과 저장
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { tier, userName, answers, aiResult } = body;

    // 유니크한 짧은 ID 생성 (충돌 시 재시도)
    let id = generateShortId();
    let retries = 0;

    while (retries < 5) {
      const { data: existing } = await supabase
        .from('results')
        .select('id')
        .eq('id', id)
        .single();

      if (!existing) break;
      id = generateShortId();
      retries++;
    }

    // 결과 저장
    const { error } = await supabase
      .from('results')
      .insert({
        id,
        tier,
        user_name: userName || null,
        answers,
        ai_result: aiResult,
      });

    if (error) {
      console.error('Supabase insert error:', error);
      return NextResponse.json(
        { error: '결과 저장에 실패했습니다' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      id,
      shareUrl: `/result/${id}`,
    });
  } catch (error) {
    console.error('Results API error:', error);
    return NextResponse.json(
      { error: '서버 오류가 발생했습니다' },
      { status: 500 }
    );
  }
}
