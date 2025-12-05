import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

// GET: 결과 조회
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // 결과 조회
    const { data, error } = await supabase
      .from('results')
      .select('*')
      .eq('id', id)
      .single();

    if (error || !data) {
      return NextResponse.json(
        { error: '결과를 찾을 수 없습니다' },
        { status: 404 }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Results GET error:', error);
    return NextResponse.json(
      { error: '서버 오류가 발생했습니다' },
      { status: 500 }
    );
  }
}

// POST: 조회수 증가
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // 조회수 증가 함수 호출
    const { error } = await supabase.rpc('increment_view_count', {
      result_id: id,
    });

    if (error) {
      console.error('View count increment error:', error);
      return NextResponse.json(
        { error: '조회수 업데이트 실패' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('View count API error:', error);
    return NextResponse.json(
      { error: '서버 오류가 발생했습니다' },
      { status: 500 }
    );
  }
}
