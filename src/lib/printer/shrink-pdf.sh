#!/usr/bin/env bash
# Parallel Ghostscript shrink for *-pre.pdf → *.pdf (bounded by PDF_SHRINK_MAX_CONCURRENCY).
#
# http://www.alfredklomp.com/programming/shrinkpdf
# Licensed under the 3-clause BSD license:
#
# Copyright (c) 2014-2019, Alfred Klomp
# All rights reserved.
#
# Redistribution and use in source and binary forms, with or without
# modification, are permitted provided that the following conditions are met:
# 1. Redistributions of source code must retain the above copyright notice,
#    this list of conditions and the following disclaimer.
# 2. Redistributions in binary form must reproduce the above copyright notice,
#    this list of conditions and the following disclaimer in the documentation
#    and/or other materials provided with the distribution.
# 3. Neither the name of the copyright holder nor the names of its contributors
#    may be used to endorse or promote products derived from this software
#    without specific prior written permission.
#
# THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
# AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
# IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
# ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE
# LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
# CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
# SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
# INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
# CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
# ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
# POSSIBILITY OF SUCH DAMAGE.

set -euo pipefail

shrink ()
{
	timeout 300 gs				\
	  -q -dNOPAUSE -dBATCH -dSAFER		\
	  -sDEVICE=pdfwrite			\
	  -dCompatibilityLevel=1.5		\
	  -dPDFSETTINGS=/prepress			\
	  -dEmbedAllFonts=true			\
	  -dSubsetFonts=true			\
	  -dAutoRotatePages=/None		\
	  -dColorImageDownsampleType=/Bicubic	\
	  -dColorImageResolution=$3		\
	  -dGrayImageDownsampleType=/Bicubic	\
	  -dGrayImageResolution=$3		\
	  -dDetectDuplicateImages \
	  -dCompressFonts=true \
	  -dMonoImageDownsampleType=/Subsample	\
	  -dMonoImageResolution=$3		\
	  -dDoThumbnails=false \
	  -sOutputFile="$2"			\
	  -c "[ /Title (Learn Lojban) /DOCINFO pdfmark" \
	  -f \
	  "$1"
}

check_smaller ()
{
	# If $1 and $2 are regular files, we can compare file sizes to
	# see if we succeeded in shrinking. If not, we copy $1 over $2:
	if [ ! -f "$1" -o ! -f "$2" ]; then
		return 0;
	fi
	ISIZE="$(echo $(wc -c "$1") | cut -f1 -d\ )"
	OSIZE="$(echo $(wc -c "$2") | cut -f1 -d\ )"
	if [ "$ISIZE" -lt "$OSIZE" ]; then
		echo "Input smaller than output, doing straight copy" >&2
		cp "$1" "$2"
	fi
}

usage ()
{
	echo "Reduces PDF filesize by lossy recompressing with Ghostscript."
	echo "  Usage: $0 [resolution_in_dpi]"
	echo "  Env: PDF_SHRINK_MAX_CONCURRENCY (default 4), PDF_SHRINK_DPI (default 120)"
}

# Output resolution: optional first argument, else PDF_SHRINK_DPI, else 120 dpi
if [ -n "${1:-}" ]; then
	res="$1"
elif [ -n "${PDF_SHRINK_DPI:-}" ]; then
	res="$PDF_SHRINK_DPI"
else
	res="120"
fi

MAXP="${PDF_SHRINK_MAX_CONCURRENCY:-4}"
case "$MAXP" in
	''|*[!0-9]*) MAXP=4 ;;
esac
if [ "$MAXP" -lt 1 ]; then MAXP=1; fi

echo "Shrinking pdf files (parallel jobs: ${MAXP}, dpi: ${res})"

VREJI_PATH=${VREJI_PATH:-/vreji}

shrink_one_pre_pdf() {
	local file="$1"
	local output="${file/-pre.pdf/.pdf}"
	echo "shrinking $file"
	if shrink "$file" "$output" "$res"; then
		check_smaller "$file" "$output"
		rm -f "$file"
		echo "successfully shrunk $file"
	else
		local exit_code=$?
		if [ "$exit_code" -eq 124 ]; then
			echo "ERROR: Timeout shrinking $file - took more than 5 minutes" >&2
			cp "$file" "$output"
			rm -f "$file"
		else
			echo "ERROR: Failed to shrink $file with exit code $exit_code" >&2
			return "$exit_code"
		fi
	fi
}

export -f shrink_one_pre_pdf shrink check_smaller
export res

if ! find "${VREJI_PATH}/uencu" -type f -name '*-pre.pdf' -print0 2>/dev/null | \
	xargs -0 -r -P"$MAXP" -n1 bash -c 'shrink_one_pre_pdf "$1" || exit 255' _; then
	echo "ERROR: one or more shrink jobs failed" >&2
	exit 1
fi

echo "Shrunk pdf files"
